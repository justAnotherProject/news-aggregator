process.env.NODE_ENV = 'development';

const _ = require('lodash');
const path = require('path');

const global = path.resolve(__dirname, '..');

const localSettings = require('./local');

const baseSettings = {
    debug: true,
    port: 3000,
    database: {
        host: '127.0.0.1',
        port: 27017,
        db: 'QAPI'
    },
    sessions: {
        cookie: {
            domain: '127.0.0.1',
            key: 'someServerKey',
            name: 'QAPI',
            days: 365
        },
        store: {
            host: '127.0.0.1',
            db: 'none',
            collection: 'sessions'
        }
    }
};

module.exports = _.merge(baseSettings, localSettings);
