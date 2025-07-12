// Simple test to verify frontend configuration
console.log('🧪 Testing Frontend Configuration...\n');

// Test environment variables
console.log('1. Environment Variables:');
console.log('   VITE_API_URL:', import.meta.env.VITE_API_URL || 'http://localhost:5000');
console.log('   NODE_ENV:', import.meta.env.NODE_ENV);

// Test imports
console.log('\n2. Testing Imports:');
try {
  // Test React imports
  const React = await import('react');
  console.log('   ✅ React import successful');
  
  // Test utility imports
  const { getImageUrl } = await import('./src/utils/imageUtils.jsx');
  console.log('   ✅ imageUtils import successful');
  
  // Test API imports
  const { itemsAPI } = await import('./src/services/api.js');
  console.log('   ✅ API imports successful');
  
  console.log('\n🎉 All imports working correctly!');
} catch (error) {
  console.error('❌ Import test failed:', error.message);
}

// Test image URL construction
console.log('\n3. Testing Image URL Construction:');
const testImageUrl = getImageUrl('/uploads/test.jpg');
console.log('   Test image URL:', testImageUrl); 