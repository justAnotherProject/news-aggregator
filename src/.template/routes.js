// the router object for each module that defines the API routes for the module and functions to be executed when each route is hit

const Router = require('koa-router');
const views = require('./views').ctx();
const access = require('access');

const router = new Router();
router.prefix('/');

// basic LCRUD
router.get('api:*:*', '/', views.list); // *:* to define the object and action
router.post('api:*:*', '/', views.add);
router.put('api:*:*', '/:id', views.update);
router.del('api:*:*', '/:id', views.remove);

module.exports = {
    router,
    list: {
        route: '/',
        total: 4,
        list: ['GET::/', 'POST::/', 'PUT::/:id', 'DEL::/:id']
    }
};

// exposts an object that contains the router object for the module and basic info about the routes
