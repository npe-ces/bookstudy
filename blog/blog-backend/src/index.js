require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const api = require('./api');

const app = new Koa();
const router = new Router();

const {
    PORT: port = 4000, //값이 없으면 4000포트
    MONGO_URI: mongoURI
} = process.env;

mongoose.Promise = global.Promise;//NODE의 pormise를 사용하도록 설정
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log('몽고디비 연결댓슈~');
}).catch((e) => {
    console.error(e);
});

//라우터 설정
router.get('/', (ctx) => {
    ctx.body = '홈';
});
router.get('/about/:name?', (ctx) => {
    const { name } = ctx.params;
    ctx.body = name ? `${name}의 소개` : '소개';
});
router.get('/posts', (ctx) => {
    const { id } = ctx.query;
    ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
});

//api라우터 적용
router.use('/api', api.routes());

app.use(bodyParser());
//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('4천번 포트 열려잇시유~~', port);
});

