const jwt = require('jsonwebtoken');

async function testSahilFetches() {
  const secret = "4f8b9e6a3d1c5270c9a8b7e6f5d4c3b2a1c8f7d9e4a3b2c1"; // from .env.local
  
  const empToken = jwt.sign({ username: 'Sahil', isAdmin: false }, secret, { expiresIn: '1h' });
  const headers = { 'Cookie': `session=${empToken}` };

  try {
    const resAll = await fetch('http://localhost:3000/api/lead', { headers });
    console.log('All Leads:', resAll.status, await resAll.json());
  } catch (e) {
    console.error('Error:', e);
  }
}

testSahilFetches().catch(console.error);
