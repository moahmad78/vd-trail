const jwt = require('jsonwebtoken');

async function testOtherFetches() {
  const secret = "4f8b9e6a3d1c5270c9a8b7e6f5d4c3b2a1c8f7d9e4a3b2c1"; // from .env.local
  
  const empToken = jwt.sign({ username: 'test', isAdmin: false }, secret, { expiresIn: '1h' });
  const headers = { 'Cookie': `session=${empToken}` };

  try {
    const resT = await fetch('http://localhost:3000/api/lead-transfer', { headers });
    const dataT = await resT.json();
    console.log('Transfers Status:', resT.status);
    console.log('Transfers Data:', dataT);
  } catch (e) {
    console.error('Transfers Error:', e);
  }

  try {
    const resN = await fetch('http://localhost:3000/api/notifications', { headers });
    const dataN = await resN.json();
    console.log('Notifications Status:', resN.status);
    console.log('Notifications Data:', dataN);
  } catch (e) {
    console.error('Notifications Error:', e);
  }
}

testOtherFetches().catch(console.error);
