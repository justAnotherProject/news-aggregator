// starts a simple server for testing purposes

const config = require('./config');

// require('./globals/db');
// require('./globals/middlewares');
// require('./globals/routes');
// require('./src/subs')();

const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);

console.log(`Listening on port ${config.port}`);

// let total = 0;
// const routeList = [
//     './src/*',
// ].map((v) => {
//     const el = require(`${v}/routes`).list;
//     total += el.total;
//     return el; 
// });

// console.log(`Loaded ${total} routes`);

// if (config.debug) {
//     console.log('/');
//     routeList.map((v) => {
//         const list = v.list.map((el,i) => `${!i ? '' : '\n'}|  |\n|  +--${el}`);
//         console.log(`|\n|\n+--${v.route} loaded ${v.total} routes\n${list}`);
//         return v;
//     });

// }
