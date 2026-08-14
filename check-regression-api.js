const jwt = require('jsonwebtoken');

async function testFetch() {
  const secret = "4f8b9e6a3d1c5270c9a8b7e6f5d4c3b2a1c8f7d9e4a3b2c1"; // from .env.local
  
  // 1. Employee Token
  const empToken = jwt.sign({ username: 'test', isAdmin: false }, secret, { expiresIn: '1h' });

  // Test Employee Fetch
  console.log('Testing Employee Fetch with "Test"...');
  const resEmp = await fetch('http://localhost:3000/api/lead?employee=Test', {
    headers: { 'Cookie': `session=${empToken}` }
  });
  const dataEmp = await resEmp.json();
  console.log('Employee Count:', dataEmp.data?.length);
}

testFetch().catch(console.error);
