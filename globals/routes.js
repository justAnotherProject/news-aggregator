// The router js which is used to tie all the routes for each module together under a single router object 

const Router = require('koa-router');

const apiModules = [
    '../src/*' // the wildcard for the name of your modules for which you want to define the routes
].map(v => require(v+'/routes').router.routes());


const router = new Router();

router.use(
    '',
    ...apiModules
);

module.exports = router;
