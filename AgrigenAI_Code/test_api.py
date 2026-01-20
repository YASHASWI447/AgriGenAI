"""
Test script for AgriGenAI Backend API
=====================================
Run this AFTER starting the backend server (python day4_backend_api.py)
"""

import requests
import json
from pathlib import Path

API_BASE_URL = "http://localhost:5000"

print("=" * 60)
print("🧪 Testing AgriGenAI Backend API")
print("=" * 60)

# ============================================
# Test 1: Health Check
# ============================================

print("\n📡 Test 1: Health Check")
print("-" * 60)

response = requests.get(f"{API_BASE_URL}/health")
print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}")

if response.status_code == 200:
    print("✅ Health check passed!")
else:
    print("❌ Health check failed!")

# ============================================
# Test 2: Home Endpoint
# ============================================

print("\n🏠 Test 2: Home Endpoint")
print("-" * 60)

response = requests.get(f"{API_BASE_URL}/")
print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}")

if response.status_code == 200:
    print("✅ Home endpoint passed!")
else:
    print("❌ Home endpoint failed!")

# ============================================
# Test 3: API Health Status
# ============================================

print("\n📊 Test 3: Detailed API Status")
print("-" * 60)

response = requests.get(f"{API_BASE_URL}/api/health")

if response.status_code == 200:
    data = response.json()
    print(f"✅ API Status:")
    print(f"   Status: {data.get('status')}")
    print(f"   Models Loaded: {data.get('models_loaded')}")
    print(f"   Hybrids Available: {data.get('hybrids_available')}")
    print(f"   Genotypes Mapped: {data.get('genotypes_mapped')}")
    
    if data.get('models_loaded') == 0:
        print("\n⚠️  WARNING: No models loaded!")
        print("   Make sure you have downloaded the ML models:")
        print("   - yield_trait_model.pkl")
        print("   - disease_resistance_model.pkl")
        print("   - stress_tolerance_model.pkl")
        print(f"   And placed them in: AgrigenAI_Output/models/")
else:
    print(f"❌ Status check failed: {response.status_code}")

# ============================================
# Test 4: Test Image Analysis (if image exists)
# ============================================

print("\n📸 Test 4: Image Analysis")
print("-" * 60)

# Try to find a test image
test_image_paths = [
    Path("../AgriGenAI_Dataset/PlantVillage/images/healthy/H1.jpg"),
    Path("AgrigenAI_Output/test_image.jpg"),
]

test_image_path = None
for path in test_image_paths:
    if path.exists():
        test_image_path = path
        break

if test_image_path:
    print(f"📤 Found test image: {test_image_path}")
    print(f"Uploading: {test_image_path.name}")
    
    try:
        with open(test_image_path, 'rb') as f:
            files = {'file': f}
            response = requests.post(f"{API_BASE_URL}/api/complete", files=files)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ Analysis successful!")
            print(f"\n🔮 Predicted Traits:")
            for trait, value in result['predicted_traits'].items():
                print(f"   {trait.title()}: {value}")
            
            if 'predicted_genotype' in result:
                genotype = result['predicted_genotype']
                print(f"\n🧬 Predicted Genotype: {genotype['genotype_id']}")
                print(f"   Description: {genotype['description']}")
                print(f"   Genes: {', '.join(genotype['genes'])}")
            
            if 'breeding_recommendations' in result:
                print(f"\n🏆 Breeding Recommendations:")
                for rec in result['breeding_recommendations'][:3]:
                    print(f"   Partner: {rec.get('partner_genotype')} (Score: {rec.get('total_score')}/100)")
            
            if 'replacement_recommendations' in result:
                print(f"\n🌾 Replacement Hybrids:")
                for rec in result['replacement_recommendations'][:3]:
                    print(f"   {rec.get('hybrid_name')} (Score: {rec.get('total_score')}/100)")
        else:
            print(f"❌ Analysis failed!")
            print(f"Error: {response.json()}")
    except Exception as e:
        print(f"❌ Error: {e}")
else:
    print("⚠️  No test image found")
    print("   To test with an image, place a plant image at:")
    print("   - ../AgriGenAI_Dataset/PlantVillage/images/healthy/H1.jpg")
    print("   OR")
    print("   - AgrigenAI_Output/test_image.jpg")

# ============================================
# Summary
# ============================================

print("\n" + "=" * 60)
print("🧪 TESTING COMPLETE!")
print("=" * 60)
print("\n📝 Summary:")
print("   ✅ Health Check: Basic connectivity")
print("   ✅ Home Endpoint: API running")
print("   ✅ API Status: Models and resources check")
print("   ℹ️  Image Analysis: Optional (requires test image)")

print("\n💡 Next Steps:")
print("   1. Ensure ML models are in AgrigenAI_Output/models/")
print("   2. Ensure hybrid_database.json exists")
print("   3. Test with real plant images")
print("   4. Integrate with React frontend")
