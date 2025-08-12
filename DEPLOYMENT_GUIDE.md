# Kunal Bisen Portfolio - Complete Deployment Guide

## 📁 Project Structure

Your website consists of two main parts:

```
kunal-portfolio/
├── frontend/          # React website (for Netlify)
├── backend/           # FastAPI server (needs separate hosting)
└── deployment/        # Organized files for deployment
```

## 🎯 Deployment Strategy

### Option 1: Frontend Only (Static Portfolio)
- Deploy frontend to Netlify
- Remove backend dependency (contact form won't save data)
- Quick and free deployment

### Option 2: Full-Stack Deployment (Recommended)
- Frontend: Deploy to Netlify
- Backend: Deploy to Railway/Vercel/Heroku
- Database: Use MongoDB Atlas (free tier)
- Complete functionality including contact form

## 🚀 Netlify Deployment Steps

### Step 1: Prepare Frontend Code
1. Use the `frontend` folder
2. Update environment variables
3. Build and deploy

### Step 2: Deploy to Netlify
1. Connect GitHub repository OR
2. Drag and drop the `dist` folder after build

### Step 3: Configure Build Settings
```
Build command: npm run build
Publish directory: dist
```

## 🔧 Backend Deployment (For Full Functionality)

If you want the contact form to work, deploy the backend separately:

### Railway Deployment:
1. Create Railway account
2. Connect GitHub
3. Deploy backend folder
4. Get railway URL
5. Update frontend environment variables

### MongoDB Setup:
1. Create MongoDB Atlas account (free)
2. Create database cluster
3. Get connection string
4. Update backend environment variables

## 📝 Environment Variables

### Frontend (.env):
```
VITE_REACT_APP_BACKEND_URL=https://your-backend.railway.app
```

### Backend (.env):
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

## 🛠️ Build Commands

### Frontend Build:
```bash
cd frontend
npm install
npm run build
```

### Backend Requirements:
```bash
cd backend
pip install -r requirements.txt
```

## 📊 Contact Form Data Access

After deployment:
- Admin Panel: `https://your-site.netlify.app/admin`
- Backend API: `https://your-backend.railway.app/api/contact`

## 🔒 Security Notes

1. Use environment variables for sensitive data
2. Enable CORS for production URLs
3. Use HTTPS for all connections
4. Regular backup of contact form data

## 📞 Support

If you need help with deployment:
1. Check Netlify build logs
2. Verify environment variables
3. Test backend API endpoints
4. Contact support if needed

---

**Next Steps:**
1. Choose deployment strategy (frontend-only or full-stack)
2. Follow the appropriate deployment guide
3. Test functionality after deployment
4. Update any hardcoded URLs