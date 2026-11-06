const http = require('http');
const Logger = require('./logger');

const logger = new Logger();

const server = http.createServer((req, res) => {
    logger.info(`Request received: ${req.method} ${req.url}`);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running successfully!');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
    logger.error('Test error message');
});