
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const SECRET = 'my_secret_key';

// CORS middleware for browser testing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// JWT Authentication Middleware
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Token required'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}

// Forward request to microservices
async function forwardRequest(req, res, target) {
    try {
        const response = await fetch(
            target + req.originalUrl
        );

        const data = await response.text();

        res.status(response.status);

        res.type(
            response.headers.get('content-type') ||
            'application/json'
        );

        res.send(data);

    } catch (err) {
        res.status(502).json({
            message: 'Service unavailable'
        });
    }
}

// Student Service Routes
app.get('/students', verifyToken, (req, res) => {
    forwardRequest(req, res, 'http://localhost:4001');
});

app.get('/students/:id', verifyToken, (req, res) => {
    forwardRequest(req, res, 'http://localhost:4001');
});

// Course Service Routes
app.get('/courses', verifyToken, (req, res) => {
    forwardRequest(req, res, 'http://localhost:4002');
});

app.get('/courses/:id', verifyToken, (req, res) => {
    forwardRequest(req, res, 'http://localhost:4002');
});

// Start API Gateway
app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});
