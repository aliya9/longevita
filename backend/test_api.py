"""
Simple test script for Longevita Health API
Run this to test the /recommend endpoint
"""

import requests
import json

# API endpoint
BASE_URL = "http://localhost:8000"
RECOMMEND_ENDPOINT = f"{BASE_URL}/recommend"

def test_health_check():
    """Test the health check endpoint"""
    print("Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_recommendations(symptoms):
    """Test the recommendations endpoint"""
    print(f"\nTesting recommendations for: '{symptoms}'")
    try:
        payload = {"symptoms": symptoms}
        response = requests.post(
            RECOMMEND_ENDPOINT,
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of recommendations: {len(data['recommendations'])}")
            print(f"Sources: {len(data['sources'])}")
            print("\nRecommendations:")
            for i, rec in enumerate(data['recommendations'], 1):
                print(f"\n{i}. {rec['recommendation']}")
                print(f"   Rationale: {rec['rationale']}")
                print(f"   Category: {rec['category']}")
            
            print(f"\nSources:")
            for source in data['sources']:
                print(f"- {source}")
            
            print(f"\nDisclaimer: {data['disclaimer']}")
            return True
        else:
            print(f"Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    """Run all tests"""
    print("🏥 Longevita Health API Test Suite")
    print("=" * 40)
    
    # Test health check
    if not test_health_check():
        print("❌ Health check failed. Make sure the server is running.")
        return
    
    print("✅ Health check passed!")
    
    # Test different symptom scenarios
    test_cases = [
        "I have frequent headaches and feel tired all the time",
        "I'm having trouble sleeping and feel anxious",
        "I have digestive issues and bloating after meals",
        "I feel low energy and have trouble concentrating"
    ]
    
    for symptoms in test_cases:
        success = test_recommendations(symptoms)
        if success:
            print("✅ Test passed!")
        else:
            print("❌ Test failed!")
        print("-" * 40)

if __name__ == "__main__":
    main()
