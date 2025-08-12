# Backend Package - FastAPI + MongoDB

## 📁 Backend Structure

```
backend/
├── server.py              # Main FastAPI application
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables (create this)
```

## 🚀 Backend Features

### API Endpoints:
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions
- `GET /api/contact/{id}` - Get specific contact
- `PATCH /api/contact/{id}/status` - Update contact status

### Database Models:
- ContactSubmission: Stores form data
- StatusCheck: Application health monitoring

## 🌐 Deployment Options

### Option 1: Railway (Recommended)
1. Create Railway account
2. Connect GitHub repository
3. Deploy backend folder
4. Add environment variables
5. Get railway URL

### Option 2: Vercel
1. Install Vercel CLI
2. Deploy with `vercel`
3. Configure environment variables
4. Get vercel URL

### Option 3: Heroku
1. Create Heroku app
2. Add Python buildpack
3. Deploy via Git
4. Configure environment variables

## 🗄️ Database Setup

### MongoDB Atlas (Free Tier):
1. Create account at mongodb.com
2. Create new cluster
3. Create database user
4. Get connection string
5. Add to environment variables

### Connection String Format:
```
mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## ⚙️ Environment Variables

### Required Variables:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio
DB_NAME=portfolio
```

### Optional Variables:
```
PORT=8001
```

## 📦 Dependencies

All required packages are in `requirements.txt`:
- fastapi
- uvicorn
- motor (async MongoDB driver)
- pydantic
- python-dotenv
- starlette

## 🚀 Deployment Commands

### Local Testing:
```bash
cd backend
pip install -r requirements.txt
python server.py
```

### Production Deployment:
- Railway: Automatically detects and runs
- Vercel: Configure `vercel.json`
- Heroku: Use `Procfile`

## 🔒 CORS Configuration

Backend is configured to accept requests from any origin for development. For production, update CORS settings:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-netlify-site.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📊 API Usage Examples

### Submit Contact Form:
```javascript
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "profession": "Developer",
  "message": "Hello!"
}
```

### Get All Contacts:
```javascript
GET /api/contact
```

## 🛠️ Troubleshooting

### Common Issues:
1. **MongoDB connection fails**: Check connection string
2. **CORS errors**: Update allowed origins
3. **Dependencies missing**: Install from requirements.txt
4. **Port conflicts**: Use environment variable

### Health Check:
Visit `/api/` to see "Hello World" message