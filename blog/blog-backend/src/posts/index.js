const Router = require('koa-router');

const posts = new Router();

const printInfo = (e) => {
    e.body = {
        method: e.method,
        path: e.path,
        params: e.params,
    };
};

posts.get('/',printInfo);
posts.post('/',printInfo);
posts.get('/:id',printInfo);
posts.post('/:id',printInfo);
posts.put('/:id',printInfo);
posts.patch('/:id',printInfo);

module.exports = posts;