// Basic responses to handle error and send the appropriate response

const _ = require('lodash');
const responses = require('../../utils/responses');
const config = require('../../config');

function parseError(e) {
    
    return e;
}

async function errorHandler(ctx, next) {
    try {
        await next();
    } catch (e) {
        console.log(e);
        const err = parseError(e);
        responses.errorJson(ctx, err);
    }
}

async function middlewares(ctx, next) {
    ctx.successJson = function successResponse(data) {
        responses.successJson(ctx, data);
    };

    ctx.errorJson = function failResponse(data) {
        if (config.debug) console.trace(data);
        responses.errorJson(ctx, data);
    };

    await errorHandler(ctx, next);
}

module.exports = middlewares;
