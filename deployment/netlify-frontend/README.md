# Kunal Bisen Portfolio - Frontend

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Development
```bash
npm run dev
# or 
yarn dev
```

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## 🌐 Netlify Deployment

### Method 1: GitHub Integration (Recommended)
1. Push code to GitHub repository
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_REACT_APP_BACKEND_URL`

### Method 2: Manual Deployment
1. Run `npm run build`
2. Drag and drop `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Build Settings
```
Build command: npm run build
Publish directory: dist
Node version: 18.x
```

## ⚙️ Environment Variables

Create `.env` file in root directory:
```
VITE_REACT_APP_BACKEND_URL=https://your-backend-url.com
```

For Netlify, add this in Site Settings > Environment Variables.

## 🎨 Features

- ✅ Responsive design
- ✅ Interactive animations (GSAP)
- ✅ Modern UI components
- ✅ Contact form
- ✅ Admin panel for viewing submissions
- ✅ Portfolio showcase
- ✅ Services section
- ✅ Video introduction section

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **React Router** - Navigation
- **ShadCN/UI** - UI components

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components  
├── assets/        # Images, icons, etc.
├── lib/           # Utility functions
├── hooks/         # Custom React hooks
└── types/         # TypeScript definitions
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration  
- `tsconfig.json` - TypeScript configuration
- `netlify.toml` - Netlify deployment configuration

## 🚨 Important Notes

1. **Backend Integration**: Contact form requires backend deployment
2. **Environment Variables**: Update `VITE_REACT_APP_BACKEND_URL` with your backend URL
3. **CORS**: Ensure backend allows requests from your Netlify domain
4. **Build Errors**: Check all imports and dependencies before deployment

## 📞 Support

For deployment issues:
1. Check Netlify build logs
2. Verify environment variables
3. Test build locally with `npm run build`
4. Ensure all dependencies are in package.json