"""
AgriGenAI - Quick Model Generator
==================================
Creates placeholder ML models for immediate testing
These are simplified versions - replace with actual trained models later
"""

import numpy as np
from sklearn.ensemble import RandomForestClassifier
from pathlib import Path
import joblib

print("🤖 Generating placeholder ML models for testing...\n")

# Configuration
BASE_PATH = Path(__file__).parent.parent  # Go up to AgrigenAI root
OUTPUT_PATH = BASE_PATH / 'AgrigenAI_Output' / 'models'
OUTPUT_PATH.mkdir(parents=True, exist_ok=True)

# Create dummy training data (this mimics ResNet50 features)
print("📊 Creating synthetic training data...")
n_samples = 1000
n_features = 2048  # ResNet50 output features

X_train = np.random.randn(n_samples, n_features)

# Create labels
y_yield = np.random.choice(['High', 'Medium', 'Low'], n_samples)
y_disease = np.random.choice(['Resistant', 'Moderate', 'Susceptible'], n_samples)
y_stress = np.random.choice(['High', 'Medium', 'Low'], n_samples)

print(f"   ✅ Created {n_samples} synthetic samples with {n_features} features")

# ============================================
# TRAIN MODELS
# ============================================

models = {
    'yield_trait_model.pkl': ('Yield', y_yield),
    'disease_resistance_model.pkl': ('Disease Resistance', y_disease),
    'stress_tolerance_model.pkl': ('Stress Tolerance', y_stress)
}

print("\n🔧 Training models...")

for model_filename, (trait_name, y_labels) in models.items():
    print(f"\n   Training {trait_name} model...")
    
    # Train Random Forest
    model = RandomForestClassifier(
        n_estimators=50,
        max_depth=10,
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train, y_labels)
    
    # Save model
    model_path = OUTPUT_PATH / model_filename
    joblib.dump(model, model_path)
    
    # Get accuracy on training data (just for info)
    train_accuracy = model.score(X_train, y_labels)
    
    print(f"   ✅ Saved: {model_filename}")
    print(f"      Training Accuracy: {train_accuracy:.2%}")
    print(f"      Classes: {list(model.classes_)}")

# ============================================
# VERIFY MODELS
# ============================================

print("\n✅ All models created successfully!")
print(f"   Location: {OUTPUT_PATH}")

print("\n📁 Models created:")
for filename in OUTPUT_PATH.glob('*.pkl'):
    size_mb = filename.stat().st_size / (1024 * 1024)
    print(f"   ✅ {filename.name} ({size_mb:.2f} MB)")

print("\n💡 IMPORTANT:")
print("   ⚠️  These are PLACEHOLDER models for testing only")
print("   ⚠️  Accuracy will NOT be realistic (random synthetic data)")
print("   📌 Replace these with actual trained models from reference repository")
print("\n🚀 You can now run the backend: python day4_backend_api.py")
