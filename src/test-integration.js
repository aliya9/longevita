/**
 * Simple integration test for Longevita Frontend-Backend
 * Run this in the browser console to test the API connection
 */

// Test API connection
async function testApiConnection() {
  console.log('🧪 Testing Longevita API Integration...');
  
  try {
    // Test health check
    const healthResponse = await fetch('http://localhost:8000/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
    
    // Test recommendations endpoint
    const recommendationsResponse = await fetch('http://localhost:8000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symptoms: 'I have frequent headaches and feel tired'
      })
    });
    
    const recommendationsData = await recommendationsResponse.json();
    console.log('✅ AI Recommendations:', recommendationsData);
    
    console.log('🎉 Integration test successful!');
    return true;
  } catch (error) {
    console.error('❌ Integration test failed:', error);
    return false;
  }
}

// Export for use in browser console
window.testLongevitaIntegration = testApiConnection;

console.log('Longevita Integration Test loaded. Run testLongevitaIntegration() to test.');
