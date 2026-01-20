# AgriGenAI

AgriGenAI is an AI-powered agriculture assistance platform that combines machine learning, computer vision, and web technologies to provide intelligent farming solutions. The system helps farmers with crop analysis, disease detection, hybrid recommendations, and personalized agricultural advice.

## Project Overview

AgriGenAI provides comprehensive smart agriculture solutions including:

- **Plant Genotype Analysis** - AI-powered prediction of genetic traits from plant images
- **Disease Detection** - Identify plant diseases (especially tomato crops) with treatment recommendations
- **Hybrid Crop Recommendations** - Suggest optimal crop varieties based on weather conditions
- **Breeding Partner Suggestions** - Recommend plant combinations for improved varieties
- **Weather-based Farming Advice** - Location-specific recommendations and seasonal guidance
- **AI Chatbot Assistant** - Intelligent assistance for all platform features

## Tech Stack

### Frontend

- **React.js** (v19.2.3) - UI framework
- **React Router DOM** (v6.20.0) - Client-side routing
- **Framer Motion** (v12.27.1) - Smooth animations
- **Lucide React** (v0.562.0) - Icon library
- **React Icons** (v5.5.0) - Additional icons
- **React Dropzone** (v14.3.8) - File upload handling
- **React Toastify** (v11.0.5) - Notifications
- **jsPDF** (v4.0.0) - PDF generation
- **Axios** (v1.6.0) - HTTP client
- **React Scripts** (v5.0.1) - Build tooling

### Backend (Planned)

- Python (ML, backend services)
- FastAPI / Flask - REST API framework
- Machine Learning & Computer Vision models

### UI Components

- Custom CSS styling
- Responsive design
- Context API for state management
- Protected routes for authenticated features

## Project Structure

```
AgrigenAI/
├── agrigen-frontend/          # React frontend application
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── FloatingChatbot.js    # AI chatbot component
│   │   │   ├── Navbar.js             # Navigation bar
│   │   │   └── Footer.js             # Footer component
│   │   ├── context/           # React Context for state management
│   │   │   ├── AuthContext.js        # Authentication state
│   │   │   ├── CartContext.js        # Shopping cart state
│   │   │   └── LanguageContext.js    # Multi-language support
│   │   ├── pages/             # Page components
│   │   │   ├── Dashboard.js          # Home page
│   │   │   ├── Analysis.js           # Plant analysis page
│   │   │   ├── Auth.js               # Authentication pages
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Signup.js             # Registration page
│   │   │   ├── CropDatabase.js       # Crop information
│   │   │   ├── Cart.js               # Shopping cart
│   │   │   ├── Payment.js            # Payment processing
│   │   │   ├── Profile.js            # User profile
│   │   │   └── Support.js            # Customer support
│   │   ├── App.js             # Main app component
│   │   └── index.js           # React entry point
│   └── package.json           # Dependencies and scripts
├── AgrigenAI_Code/            # Backend code directory (planned)
├── AgrigenAI_Output/          # Output/results directory
├── notebooks/                 # Jupyter notebooks for ML
└── ReadMe.md                  # This file
```

## Features

### Authentication & User Management

- User registration and login
- Protected routes for authenticated users
- User profile management
- Session persistence using localStorage

### Core Functionality

1. **Analysis Page** - Upload plant images for genotype and disease analysis
2. **Crop Database** - Browse and explore crop varieties and recommendations
3. **Shopping Cart** - Add and manage agricultural products
4. **Payment Processing** - Secure payment integration
5. **AI Chatbot** - 24/7 intelligent assistance for farming queries
6. **Multi-language Support** - English, Hindi, and Kannada (extensible)

### UI/UX

- Floating chatbot component visible across all pages
- Responsive design for mobile and desktop
- Toast notifications for user feedback
- Smooth animations and transitions
- Professional dashboard interface

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd agrigen-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will open at `http://localhost:3000`

4. Build for production:

```bash
npm build
```

## Available Scripts

In the `agrigen-frontend` directory, you can run:

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from create-react-app (irreversible)

## API Integration

### Gemini AI API

The chatbot uses Google's Gemini 2.0 Flash API for intelligent responses:

- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- Features: Context-aware agricultural advice, disease identification, crop recommendations

### Backend APIs (Planned)

- Plant genotype analysis endpoints
- Disease detection service
- Weather data integration
- Payment processing API

## State Management

### Context API

- **AuthContext** - Manages user authentication and session
- **CartContext** - Manages shopping cart items and operations
- **LanguageContext** - Manages language preferences and translations

## Security Features

- Protected routes requiring authentication
- localStorage for secure session management
- Environment variables for API keys (not exposed in code)
- Input validation and sanitization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues & Fixes

### Fixed Issues

- ✅ React hooks warning - Resolved by adding `react-router-dom` dependency
- ✅ File casing issues - Standardized to `FloatingChatbot.js`
- ✅ Import path inconsistencies - Unified import paths across components

## Future Enhancements

- [ ] Backend API implementation (FastAPI/Flask)
- [ ] Machine learning models for plant analysis
- [ ] Real-time weather integration
- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Mobile app (React Native)
- [ ] Advanced image processing for disease detection
- [ ] Data analytics dashboard for farmers
- [ ] Email notifications and alerts
- [ ] Community forum for farmers

## Contributing

Currently in development. Future contribution guidelines will be provided.

## License

[To be defined]

## Contact & Support

For support queries, users can:

- Use the in-app AI chatbot
- Visit the Support page
- Contact through the support email (to be configured)

## Project Timeline

- **Phase 1**: Frontend UI/UX (Current) ✅
- **Phase 2**: Backend API development (Planned)
- **Phase 3**: ML model integration (Planned)
- **Phase 4**: Mobile app development (Planned)
- **Phase 5**: Production deployment (Planned)
