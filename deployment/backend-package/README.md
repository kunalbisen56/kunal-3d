# Kunal Bisen Portfolio - Backend API

FastAPI backend service for handling contact form submissions and admin operations.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- MongoDB Atlas account (or local MongoDB)

### Installation
```bash
pip install -r requirements.txt
```

### Environment Setup
Create `.env` file:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio
DB_NAME=portfolio
```

### Run Locally
```bash
python server.py
```

## 🌐 Deployment Options

### Railway (Recommended)
1. Create Railway account
2. Connect GitHub repository  
3. Deploy backend folder
4. Add environment variables
5. Railway provides automatic HTTPS URL

### Vercel
```bash
pip install vercel
vercel
```

### Heroku
1. Create `Procfile`: `web: python server.py`
2. Deploy via Git or GitHub integration

## 🗄️ MongoDB Atlas Setup

1. Create account at [mongodb.com](https://mongodb.com)
2. Create new project and cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Add to environment variables

## 📡 API Endpoints

### Contact Form
- `POST /api/contact` - Submit new contact
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/{id}` - Get specific contact
- `PATCH /api/contact/{id}/status` - Update contact status

### Health Check
- `GET /api/` - Returns "Hello World"

## 📦 Dependencies

- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Python-dotenv** - Environment variables
- **Starlette** - CORS middleware

## 🔒 CORS Configuration

Update for production in `server.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-netlify-site.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)
```

## ⚙️ Environment Variables

### Required:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Optional:
```
DB_NAME=portfolio
PORT=8001
```

## 🛠️ Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python server.py

# Server will run on http://localhost:8001
```

## 📊 Data Models

### ContactSubmission
- id: UUID
- name: string
- email: email string
- profession: optional string
- message: string
- timestamp: datetime
- status: "new" | "read" | "replied"

## 🧪 Testing

API endpoints can be tested at:
- Local: `http://localhost:8001/docs`
- Production: `https://your-backend-url.com/docs`

## 🚨 Important Notes

1. **Database**: Use MongoDB Atlas for production
2. **Environment Variables**: Never commit `.env` files
3. **CORS**: Update allowed origins for production
4. **Security**: Consider authentication for admin endpoints

## 🔧 Troubleshooting

### Common Issues:
- **MongoDB connection**: Check connection string and IP whitelist
- **CORS errors**: Update allowed origins
- **Module not found**: Install from requirements.txt
- **Port conflicts**: Use environment variable for port

### Health Check:
Visit `/api/` endpoint to verify server is running.