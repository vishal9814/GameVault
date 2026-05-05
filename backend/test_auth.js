
const axios = require('axios');

const testAuth = async () => {
  try {
    console.log('Testing Registration...');
    const regRes = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: 'test' + Date.now() + '@example.com',
      password: 'password123',
      role: 'customer'
    });
    console.log('Registration Success:', regRes.data);

    const email = regRes.data.user.email;
    console.log('\nTesting Login...');
    const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
      email: email,
      password: 'password123'
    });
    console.log('Login Success:', loginRes.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
};

testAuth();
