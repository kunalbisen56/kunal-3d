from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from supabase import create_client, Client
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
app = FastAPI(title="FastAPI React Supabase Application")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
def get_supabase_client() -> Client:
    """Get Supabase client for database operations"""
    supabase_url = os.environ.get('SUPABASE_URL')
    supabase_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')  # Using service role for backend operations
    
    if not supabase_url or not supabase_key:
        raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
    
    return create_client(supabase_url, supabase_key)

# Global Supabase client
supabase = get_supabase_client()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create API router
api_router = APIRouter(prefix="/api")

# Contact Form Models (simplified to match Supabase schema)
class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr  
    profession: Optional[str] = None
    message: str

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    contact_id: str

class ContactSubmission(BaseModel):
    id: str
    name: str
    email: str
    profession: Optional[str] = None
    message: str
    created_at: datetime
    updated_at: datetime
    status: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World - Supabase Backend"}

# Contact Form Routes
@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """
    Submit a new contact form entry to Supabase
    """
    try:
        # Prepare data for Supabase insertion
        submission_data = {
            "name": contact_data.name,
            "email": str(contact_data.email),
            "profession": contact_data.profession,
            "message": contact_data.message,
            "status": "new"
        }
        
        # Insert into Supabase
        result = supabase.table("contact_submissions").insert(submission_data).execute()
        
        if result.data:
            contact_id = result.data[0]["id"]
            logger.info(f"New contact submission received from {contact_data.email} at {result.data[0]['created_at']}")
            return ContactSubmissionResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon.",
                contact_id=contact_id
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
        result = supabase.table("contact_submissions").select("*").order("created_at", desc=True).execute()
        
        if result.data:
            return [ContactSubmission(**contact) for contact in result.data]
        else:
            return []
            
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact/{contact_id}", response_model=ContactSubmission)
async def get_contact_submission(contact_id: str):
    """
    Get a specific contact submission by ID
    """
    try:
        result = supabase.table("contact_submissions").select("*").eq("id", contact_id).execute()
        
        if result.data:
            return ContactSubmission(**result.data[0])
        else:
            raise HTTPException(status_code=404, detail="Contact submission not found")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact submission {contact_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.patch("/contact/{contact_id}/status")
async def update_contact_status(contact_id: str, status_data: dict):
    """
    Update the status of a contact submission (admin only)
    """
    try:
        new_status = status_data.get("status")
        valid_statuses = ["new", "read", "replied"]
        
        if new_status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        result = supabase.table("contact_submissions").update({"status": new_status}).eq("id", contact_id).execute()
        
        if result.data:
            return {"success": True, "message": f"Contact status updated to {new_status}"}
        else:
            raise HTTPException(status_code=404, detail="Contact submission not found")
            
    except HTTPException:
        # Re-raise HTTP exceptions (like 400, 404) without wrapping in 500
        raise
    except Exception as e:
        logger.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Mount the API router
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)