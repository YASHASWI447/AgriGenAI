# AgriGenAI

AgriGenAI is an AI-powered agriculture assistance platform that combines machine learning, computer vision, and web technologies to provide intelligent farming solutions. The system helps farmers with crop analysis, disease detection, hybrid recommendations, and personalized agricultural advice.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Quick Start (5 minutes)](#-quick-start-5-minutes)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#-api-endpoints)
- [ML Models](#-ml-models)
- [Dataset Setup](#-dataset-setup)
- [Reference Notebooks](#-reference-notebooks)
- [Project Structure](#-project-structure)
- [Features](#features)
- [Current Status](#-current-status)
- [Training Models](#-training-with-real-data)
- [Troubleshooting](#-troubleshooting)

---

## Project Overview

AgriGenAI provides comprehensive smart agriculture solutions including:

- Plant Genotype Analysis - AI-powered prediction of genetic traits from plant images
- Disease Detection - Identify plant diseases (especially tomato crops) with treatment recommendations
- Hybrid Crop Recommendations - Suggest optimal crop varieties based on weather conditions
- Breeding Partner Suggestions - Recommend plant combinations for improved varieties
- Weather-based Farming Advice - Location-specific recommendations and seasonal guidance
- AI Chatbot Assistant - Intelligent assistance for all platform features

---

## Tech Stack

### Frontend

- React.js (v19.2.3) - UI framework
- React Router DOM (v6.20.0) - Client-side routing
- Framer Motion (v12.27.1) - Smooth animations
- Lucide React & React Icons - Icon libraries
- React Dropzone** (v14.3.8) - File upload handling
- React Toastify (v11.0.5) - Notifications
- jsPDF (v4.0.0) - PDF generation
- Axios (v1.6.0) - HTTP client

### Backend

- Python 3.13 - Core language
- Flask(v2.3.3) - REST API framework
- Flask-CORS - Cross-origin requests
- scikit-learn (v1.3.0) - ML models (RandomForest)
- numpy (v1.24.3) - Numerical computing
- Pillow (v10.0.0) - Image processing
- OpenCV (v4.8.0.74) - Computer vision
- joblib (v1.3.1) - Model serialization
- TensorFlow (v2.13.0, optional) - Deep learning features

---

## Quick Start (5 minutes)

### Prerequisites

- Node.js v18+
- Python 3.13+
- pip package manager

### Step 1: Generate Placeholder Models

```bash
cd AgrigenAI_Code
python generate_placeholder_models.py
```

Expected output:

```
✅ Created 1000 synthetic samples with 2048 features
✅ All models created successfully!
   ✅ yield_trait_model.pkl
   ✅ disease_resistance_model.pkl
   ✅ stress_tolerance_model.pkl
```

### Step 2: Start Backend Server

```bash
# Create & activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start backend
python day4_backend_api.py
```

Expected output:

```
============================================================
🌱 AgriGenAI Backend (COMPLETE: All 27 Genotypes)
============================================================
✅ System Status: READY
   Models loaded: 3
   Hybrids available: 22
   Genotypes mapped: 27

🚀 Server starting on http://localhost:5000
```

### Step 3: Start Frontend (New Terminal)

```bash
cd agrigen-frontend
npm install
npm start
# Opens http://localhost:3000
```

### Step 4: Test Integration

- Go to http://localhost:3000/analysis
- Upload a tomato plant image
- See predictions and recommendations

---

## Installation & Setup

### Frontend Setup

```bash
cd agrigen-frontend
npm install
npm start
# Runs on http://localhost:3000
```

### Backend Setup

```bash
cd AgrigenAI_Code

# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Generate models
python generate_placeholder_models.py

# Start server
python day4_backend_api.py
# Runs on http://localhost:5000
```

---

## 🔌 API Endpoints

**Base URL**: `http://localhost:5000`

### Health Check

```bash
GET /api/health
```

Response:

```json
{
  "status": "healthy",
  "models_loaded": 3,
  "hybrids_available": 22,
  "genotypes_mapped": 27
}
```

### Complete Analysis (Main Endpoint)

```bash
POST /api/complete
Content-Type: multipart/form-data
Body:
  - file: <image>
  - location: <location_string>
```

Response:

```json
{
  "success": true,
  "predicted_traits": {
    "yield": "High",
    "disease_resistance": "Resistant",
    "stress_tolerance": "High"
  },
  "predicted_genotype": {
    "genotype_id": "G1",
    "genes": ["fw2.2-AA", "HSP-High", "Tm-2a-Present"],
    "description": "Superior: High yield, resistant and stress tolerant"
  },
  "weather": {
    "temperature": 25.5,
    "humidity": 65,
    "condition": "Partly Cloudy"
  },
  "breeding_recommendations": [...],
  "replacement_recommendations": [...]
}
```

### Image Analysis Only

```bash
POST /api/analyze
Content-Type: multipart/form-data
Body: file: <image>
```

Returns only trait predictions without recommendations.

---

## 📊 ML Models

### Current Status: PLACEHOLDER (Synthetic Data)

- Models: 3 RandomForest classifiers trained on plant images
- Accuracy: 92.85% (on synthetic test data)
- Features: 2048-dimensional ResNet50 vectors
- Traits Predicted**:
  - Yield (High/Medium/Low)
  - Disease Resistance (Resistant/Moderate/Susceptible)
  - Stress Tolerance (High/Medium/Low)

### Current Models

Placeholder Models (for testing/demo):

- Generated synthetically for rapid testing
- Located: `AgrigenAI_Output/models/`
- Created by: `generate_placeholder_models.py`

### 27 Genotypes (G1-G27)

Maps trait combinations to genetic profiles:

- **G1** (High Yield + Resistant + High Stress Tolerance) - Superior genotype
- **G14** (Medium Yield + Moderate + Medium Stress Tolerance) - Average genotype
- **G27** (Low Yield + Susceptible + Low Stress Tolerance) - Poor genotype
- All combinations scientifically validated with genetic information (fw2.2, HSP, Tm-2 genes)

### Hybrid Database (22 Varieties)

Real tomato varieties included:

- Arka Vikas, Pusa Ruby, Himsona
- Sunvara F1, VNR Hybrid
- Punjab Chhuhara, Kashi Amrit
- And 15+ more regional varieties

### Feature Extraction

- **ResNet50** (TensorFlow) or fallback to color histograms
- **Input**: Any tomato plant image (224×224)
- **Output**: 2048-dimensional feature vector

---

## 🌱 Dataset Setup

### Overview

To train production ML models with `retrain_models.py`, you need two datasets:

1. **PlantVillage** - Disease images (~50,000 images)
2. **Laboro** - Field images with real tomato plants

### Step 1: Download PlantVillage Dataset

#### Option A: Download from Kaggle (Easiest)

1. Go to: https://www.kaggle.com/datasets/emmarex/plantvillage-dataset
2. Download the dataset (4.3 GB)
3. Extract to: `AgriGenAI_Dataset\PlantVillage\`

#### Option B: Download from GitHub

1. Visit: https://github.com/spMohanty/PlantVillage-Dataset
2. Clone or download the repository
3. Extract images to: `AgriGenAI_Dataset\PlantVillage\images\`

#### Expected Structure:

```
AgriGenAI_Dataset/
└── PlantVillage/
    └── images/
        ├── healthy/
        ├── Early_blight/
        ├── Late_blight/
        ├── Bacterial_spot/
        └── ... (other disease categories)
```

### Step 2: Download Laboro Dataset

#### Option A: From Google Drive (Reference)

Ask your group members for the Laboro dataset link.

#### Option B: Create Your Own

1. Use field images from your phone camera
2. Or download from: https://www.kaggle.com/datasets/atrinuc/plantvillage-tomato-disease (alternative)
3. Place in: `AgriGenAI_Dataset\Laboro\images\`

#### Expected Structure:

```
AgriGenAI_Dataset/
└── Laboro/
    └── images/
        ├── field_img_1.jpg
        ├── field_img_2.jpg
        ├── field_img_3.jpg
        └── ...
```

### Step 3: Create Directory Structure

```powershell
# Create folders
New-Item -ItemType Directory -Path "AgriGenAI_Dataset\PlantVillage\images" -Force
New-Item -ItemType Directory -Path "AgriGenAI_Dataset\Laboro\images" -Force
```

### Step 4: Verify Your Setup

```python
from pathlib import Path

BASE_PATH = Path('AgriGenAI_Dataset')

# Check PlantVillage
pv_path = BASE_PATH / 'PlantVillage/images'
pv_images = list(pv_path.glob('**/*.jpg'))
print(f"✅ PlantVillage: {len(pv_images)} images found")

# Check Laboro
laboro_path = BASE_PATH / 'Laboro/images'
laboro_images = list(laboro_path.glob('*.jpg'))
print(f"✅ Laboro: {len(laboro_images)} images found")

if len(pv_images) > 0 and len(laboro_images) > 0:
    print("✅ Ready to train!")
```

### Step 5: Train Models

Once datasets are in place, run:

```bash
cd AgrigenAI_Code
python retrain_models.py
```

This will:

1. Load PlantVillage images
2. Load Laboro field images
3. Extract features (ResNet50 or simple features)
4. Train 3 RandomForest models
5. Save to `AgrigenAI_Output/models/`

Training time: 30-60 minutes (depends on dataset size)



## 📚 Reference Notebooks

The reference repository (s-a-n-19/AgriGenAI) contains 3 comprehensive Jupyter notebooks demonstrating the complete ML pipeline. They are included in the `notebooks/` folder.

### 1️⃣ day1_test.ipynb - Feature Extraction

**What it does:**

- Loads PlantVillage (50K+ diseased leaf images) + Laboro (800+ field photos)
- Uses ResNet50 to extract 2048-dimensional feature vectors
- Creates metadata with categories and disease types
- Saves features for Day 2 training

**Key outputs:**

- `phenotype_features.npy` - Feature vectors (15313 × 2048)
- `image_metadata.csv` - Image paths, categories, organs

**Why important:** Foundation for all ML models - raw image → numerical features

### 2️⃣ day2_genotype_mapping.ipynb - Trait Prediction & Hybrid Database ⭐

**What it does:**

- Loads Day 1 features
- Maps disease categories → plant traits (Yield, Disease Resistance, Stress Tolerance)
- Builds **27 genotype reference database** with genes and descriptions
- Creates **22 hybrid varieties database** with parent genotypes
- Trains RandomForest classifiers (93% accuracy)

**Key innovations:**

- **Genotype Predictor**: Maps trait combinations → G1-G27 genotypes
- **Hybrid Scoring**: Scores compatibility between predicted traits and available hybrids
- **Gene Information**: fw2.2, HSP, Tm-2 gene mappings

**Why important:** Core intelligence - predicts best seeds for given traits

### 3️⃣ day3_weather_recommendation.ipynb - Weather Integration 🌤️

**What it does:**

- Loads Day 2 models and genotype predictor
- Fetches real-time weather from OpenWeatherMap API
- Scores hybrids based on weather conditions
- Generates farmer-friendly reports with recommendations

**Key features:**

- Weather API integration (temperature, humidity, conditions)
- Multi-factor scoring: Trait match (60%) + Weather match (40%)
- Generates plain-text farmer reports with explanations
- Tests with multiple locations

**Why important:** Real-world deployment - considers local weather for recommendations

### Reference Value

**Use Day 2 notebook for:**

- ✅ Genotype database structure (27 genotypes)
- ✅ Hybrid scoring logic
- ✅ Trait mapping examples
- ✅ ML model training patterns

**Use Day 3 notebook for:**

- ✅ Weather API integration code
- ✅ Recommendation engine design
- ✅ Report generation format
- ✅ Complete system pipeline

---

## 📂 Project Structure

```
AgrigenAI/
├── agrigen-frontend/          # React frontend
│   ├── public/                # Static files
│   ├── src/
│   │   ├── pages/             # Analysis, Dashboard, Cart, etc.
│   │   ├── components/        # FloatingChatbot, Navbar, etc.
│   │   ├── context/           # Auth, Cart, Language state
│   │   └── App.js
│   └── package.json
│
├── AgrigenAI_Code/            # Python backend
│   ├── day4_backend_api.py    # Flask REST API (620+ lines)
│   ├── retrain_models.py      # ML training script (711 lines)
│   ├── generate_placeholder_models.py  # Quick model generator
│   ├── test_api.py            # API testing
│   ├── requirements.txt       # Python dependencies
│   └── AgrigenAI_Output/
│       ├── models/            # ML models (.pkl files)
│       │   ├── yield_trait_model.pkl
│       │   ├── disease_resistance_model.pkl
│       │   └── stress_tolerance_model.pkl
│       ├── hybrids/           # Crop database
│       │   └── hybrid_database.json (22 varieties)
│       └── uploads/           # User uploaded images
│
├── notebooks/                 # Reference Jupyter notebooks
│   ├── day1_test.ipynb        # Feature extraction (24.7 KB)
│   ├── day2_genotype_mapping.ipynb  # Genotype-trait mapping (41.4 KB)
│   └── day3_weather_recommendation.ipynb  # Weather integration (60.8 KB)
│
├── venv/                      # Python virtual environment
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

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
4. **Payment Processing** - Secure payment integration (UI)
5. **AI Chatbot** - 24/7 intelligent assistance for farming queries
6. **Multi-language Support** - English, Hindi, and Kannada (extensible)

### UI/UX

- Floating chatbot component visible across all pages
- Responsive design for mobile and desktop
- Toast notifications for user feedback
- Smooth animations and transitions
- Professional dashboard interface



## 🌾 Training with Real Data

To improve accuracy beyond 92.85%:

1. **Download PlantVillage** (50K+ disease images) - 4.3 GB
2. **Get Laboro dataset** (800+ field photos) from team
3. **Extract to**: `AgriGenAI_Dataset/`
4. **Run**: `python retrain_models.py`
5. **Wait**: ~1 hour for training
6. **Deploy**: Backend auto-uses new models

---

## 🔧 Advanced Features

### Genotype Predictor

All 27 genotypes (G1-G27) scientifically mapped with:

- Trait combinations (Yield × Disease Resistance × Stress Tolerance)
- Gene descriptions (fw2.2, HSP, Tm-2)
- Breeding value assessments
- Genetic trait descriptions

### Hybrid Analyzer

Scores and ranks 22 tomato varieties based on:

- Predicted traits match
- Weather conditions
- Regional availability
- Historical performance

### Weather Integration

- Real-time weather from OpenWeatherMap API
- Multi-factor recommendation scoring
- Location-based suggestions
- Seasonal farming advice

---

## 🐛 Troubleshooting

### Error: "No module named flask"

```bash
pip install -r requirements.txt
```

### Error: "Models not loading"

```bash
python generate_placeholder_models.py
# Then restart backend
```

### Error: "Port 5000 already in use"

```bash
# Kill the process using port 5000
Stop-Process -Name python -Force
```

### Backend runs but no models loaded

Check console output and ensure:

- `AgrigenAI_Output/models/` exists
- `.pkl` files are present
- File permissions are correct

### Frontend can't connect to backend

- Verify backend is running on http://localhost:5000
- Check that CORS is enabled
- Ensure API_BASE_URL is set correctly in frontend

### Training fails with "No module named tensorflow"

TensorFlow is optional. The system falls back to simple features automatically.

---

## Future Enhancements

- [ ] Advanced disease detection with visual confirmation
- [ ] Real-time weather-based alerts
- [ ] Farmer analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Community knowledge sharing
- [ ] Integration with seed suppliers

---


## License

[To be defined]


