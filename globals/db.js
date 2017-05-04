// the db configs to get the db connected. Leaving the mongoose specific settings in case it's recycled

const plugins = require('mongoose-plugins');
const mongoose = require('mongoose');
const url = require('url');

const config = require('../config');

function makeMongoUrl() {
    const dbSettings = config.database;
    
    if (!dbSettings) {
        return false;
    }
    const urlObj = {
        hostname: dbSettings.host,
        port: dbSettings.port,
        pathname: `/${dbSettings.db}`,
        query: dbSettings.options,
        protocol: 'mongodb',
        slashes: true
    };
    if (dbSettings.username) {
        urlObj.auth = `${dbSettings.username}:${dbSettings.password || ''}`;
    }
    return url.format(urlObj);
}

function connectMongoDb() {
    if (mongoose.connect(makeMongoUrl(), { config: { autoIndex: false } })) {
        mongoose.plugin(plugins.transformer);
    }
}

connectMongoDb();
