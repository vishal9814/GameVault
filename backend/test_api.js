
const http = require('http');

const postRequest = (path, data) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => responseBody += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(responseBody)
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            body: responseBody
          });
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
};

async function test() {
  try {
    console.log('Testing Registration...');
    const regRes = await postRequest('/api/auth/register', {
      name: 'Test User',
      email: 'test' + Date.now() + '@example.com',
      password: 'password123'
    });
    console.log('Reg Result:', regRes);

    if (regRes.statusCode === 200) {
      console.log('\nTesting Login...');
      const loginRes = await postRequest('/api/auth/login', {
        email: regRes.body.user.email,
        password: 'password123'
      });
      console.log('Login Result:', loginRes);
    }
  } catch (err) {
    console.error('Test Failed:', err);
  }
}

test();
