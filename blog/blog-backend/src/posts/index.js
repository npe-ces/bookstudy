const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

// const printInfo = (ctx) => {
//     ctx.body = {
//         method: ctx.method,
//         path: ctx.path,
//         params: ctx.params
//     };
// };

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.checkObjdctId, postsCtrl.read);
posts.delete('/:id', postsCtrl.checkObjdctId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.checkObjdctId, postsCtrl.update);

module.exports = posts;