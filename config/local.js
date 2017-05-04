process.env.NODE_ENV = 'development';

const _ = require('lodash');

const settings = {
    rootDirectory: global,
    debug: true,
    port: 3000,
    database: {
        host: '127.0.0.1',
        port: 27017,
        db: 'ecommerce'
    }
    // keys: ['12345689', '098765432'],
    // authentication: {
    //     tokenKey: 'authToken',
    // },
    // cors: {
    //     enabled: true,
    //     credentials: true,
    // },
    // sessions: {
    //     enabled: true,
    //     cookie: {
    //         domain: 'none',
    //     }
    // }
};

module.exports = settings;
