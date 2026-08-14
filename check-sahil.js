const jwt = require('jsonwebtoken');

async function testSahilFetches() {
  const secret = "4f8b9e6a3d1c5270c9a8b7e6f5d4c3b2a1c8f7d9e4a3b2c1"; // from .env.local
  
  const empToken = jwt.sign({ username: 'Sahil', isAdmin: false }, secret, { expiresIn: '1h' });
  const headers = { 'Cookie': `session=${empToken}` };

  try {
    const resA = await fetch('http://localhost:3000/api/lead?employee=Sahil', { headers });
    console.log('Assigned:', resA.status, await resA.json());
    
    const resU = await fetch('http://localhost:3000/api/lead?unassigned=true', { headers });
    console.log('Unassigned:', resU.status, await resU.json());
    
    const resT = await fetch('http://localhost:3000/api/lead-transfer', { headers });
    console.log('Transfers:', resT.status, await resT.json());

    const resN = await fetch('http://localhost:3000/api/notifications', { headers });
    console.log('Notifications:', resN.status, await resN.json());
  } catch (e) {
    console.error('Error:', e);
  }
}

testSahilFetches().catch(console.error);
