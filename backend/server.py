from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="FastAPI React MongoDB Application")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize MongoDB client
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db_name = os.environ.get('DB_NAME', 'test_database')
db = client[db_name]

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create API router
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    profession: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="new")  # new, read, replied

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr  
    profession: Optional[str] = None
    message: str

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    contact_id: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact Form Routes
@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """
    Submit a new contact form entry
    """
    try:
        # Create contact submission object with accurate current UTC timestamp
        current_time = datetime.now(timezone.utc)
        contact_submission = ContactSubmission(
            **contact_data.dict(),
            timestamp=current_time
        )
        
        # Save to database
        result = await db.contacts.insert_one(contact_submission.dict())
        
        if result.inserted_id:
            logger.info(f"New contact submission received from {contact_data.email} at {contact_submission.timestamp}")
            return ContactSubmissionResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon.",
                contact_id=contact_submission.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact submission")
            
    except Exception as e:
        logger.error(f"Error saving contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """
    Get all contact form submissions (admin only)
    """
    try:
        contacts = await db.contacts.find().sort("timestamp", -1).to_list(1000)
        return [ContactSubmission(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact/{contact_id}", response_model=ContactSubmission)
async def get_contact_submission(contact_id: str):
    """
    Get a specific contact submission by ID
    """
    try:
        contact = await db.contacts.find_one({"id": contact_id})
        if contact:
            return ContactSubmission(**contact)
        else:
            raise HTTPException(status_code=404, detail="Contact submission not found")
    except Exception as e:
        logger.error(f"Error fetching contact submission {contact_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.patch("/contact/{contact_id}/status")
async def update_contact_status(contact_id: str, status: str):
    """
    Update the status of a contact submission (admin only)
    """
    try:
        valid_statuses = ["new", "read", "replied"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        result = await db.contacts.update_one(
            {"id": contact_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count:
            return {"success": True, "message": f"Contact status updated to {status}"}
        else:
            raise HTTPException(status_code=404, detail="Contact submission not found")
            
    except Exception as e:
        logger.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Mount the API router
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)