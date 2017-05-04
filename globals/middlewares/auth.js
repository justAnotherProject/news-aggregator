// The auth file for basic authorization module to work with middleware with login and setCookie function. Left the dead code in case it's reused

const crypto = require('crypto'); 
const config = require('../../config');

const hash = crypto.createHash('sha512');
hash.update(config.sessions.cookie.key)
const signKey = hash.digest('hex');

function setCookie(ctx, token, remember) {
    // const options = {
    //     domain: config.sessions.cookie.domain,
    //     expires: remember ? new Date(new Date().getTime() + (1000 * 3600 * 24 * config.sessions.cookie.days)) : undefined
    // };
    // ctx.cookies.set(config.sessions.cookie.name, token, options);
}

const login = function login(ctx, user){
    // const claims = {permissions:user.permissions,id:user._id};
    // const token = njwt.create(claims,signKey).compact();

    // setCookie(ctx, token, true);
}

module.exports = async function AuthenticationMiddleware(ctx, next) {
    // ctx.login=login;

    // const token = ctx.cookies.get(config.sessions.cookie.name);
    // if(token) try {
    //     vjwt = njwt.verify(token,signKey);

    //     ctx.request.userID = vjwt.body.id;
    //     ctx.request.permissions = vjwt.body.permissions;
    // } catch(e){
    //     console.log('TOKEN VERIFY ERROR: ',e);
    // }

    // ctx.request.permissions = ctx.request.permissions ||{};

    // if(config.debug)ctx.request.permissions.debug=true;

    // await next();
};
