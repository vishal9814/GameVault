const http = require('http');

const post = (path, data) => new Promise((resolve, reject) => {
  const body = JSON.stringify(data);
  const req = http.request({
    hostname: 'localhost', port: 5000, path, method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': body.length }
  }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(d) }));
  });
  req.on('error', reject);
  req.write(body);
  req.end();
});

const get = (path, token) => new Promise((resolve, reject) => {
  const req = http.request({
    hostname: 'localhost', port: 5000, path, method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(d) }));
  });
  req.on('error', reject);
  req.end();
});

(async () => {
  const email = `test${Date.now()}@example.com`;
  
  console.log('=== TEST 1: REGISTRATION ===');
  const reg = await post('/api/auth/register', { name: 'Test User', email, password: 'Test@1234', role: 'customer' });
  console.log(`Status: ${reg.status} | User: ${reg.data.user?.name} | Token: ${reg.data.token ? 'YES' : 'NO'}`);
  
  console.log('\n=== TEST 2: LOGIN ===');
  const login = await post('/api/auth/login', { email, password: 'Test@1234' });
  console.log(`Status: ${login.status} | User: ${login.data.user?.name} | Token: ${login.data.token ? 'YES' : 'NO'}`);
  
  console.log('\n=== TEST 3: GET /me (with token) ===');
  const me = await get('/api/auth/me', login.data.token);
  console.log(`Status: ${me.status} | User: ${me.data?.name} | Email: ${me.data?.email}`);
  
  console.log('\n=== TEST 4: MOCK GOOGLE LOGIN ===');
  const google = await post('/api/auth/google', { idToken: 'mock_token_for_mrkumarvishal355' });
  console.log(`Status: ${google.status} | User: ${google.data.user?.name} | Email: ${google.data.user?.email} | Token: ${google.data.token ? 'YES' : 'NO'}`);
  
  console.log('\n=== TEST 5: LOGIN WITH WRONG PASSWORD ===');
  const bad = await post('/api/auth/login', { email, password: 'wrongpass' });
  console.log(`Status: ${bad.status} | Message: ${bad.data.message}`);
  
  console.log('\n=== TEST 6: DUPLICATE REGISTRATION ===');
  const dup = await post('/api/auth/register', { name: 'Dup', email, password: 'Test@1234' });
  console.log(`Status: ${dup.status} | Message: ${dup.data.message}`);
  
  console.log('\n=== ALL TESTS COMPLETE ===');
})();
