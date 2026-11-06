const EventEmitter = require('events');
const fs = require('fs');

class Logger extends EventEmitter {
    constructor() {
        super();

        this.on('info', (message) => {
            const log = `[${new Date().toISOString()}] INFO: ${message}\n`;

            fs.appendFile('app.log', log, (err) => {
                if (err) console.error(err);
            });
        });

        this.on('error', (message) => {
            const log = `[${new Date().toISOString()}] ERROR: ${message}\n`;

            fs.appendFile('app.log', log, (err) => {
                if (err) console.error(err);
            });

            console.error(message);
        });
    }

    info(message) {
        this.emit('info', message);
    }

    error(message) {
        this.emit('error', message);
    }
}

module.exports = Logger;