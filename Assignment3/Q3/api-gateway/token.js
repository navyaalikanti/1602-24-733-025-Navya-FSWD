
const jwt = require('jsonwebtoken');

const token = jwt.sign(
    { id: 1, username: 'Navya' },
    'my_secret_key',
    { expiresIn: '1h' }
);

console.log('Generated JWT Token:');
console.log(token);
