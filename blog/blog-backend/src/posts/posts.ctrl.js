const Post = require('../model/post');
const { ObjectId } = require('mongoose').Types;


//가장먼저 실행되면서 id값에 대한 검증을 하는 함수
exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params;

    //검증실패
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return null;
    }
    return next();
}

exports.write = async (ctx) => {
    const { title, body, tags } = ctx.request.body;

    //새 post 인스턴스 만듦

    const post = new Post({
        title, body, tags
    });

    try {
        await post.save();//db 등록
        ctx.body = post; //저장된 결과 반환
    } catch (e) {
        //db오류 발생시 500에러 반환
        ctx.throw(e, 500);
    }

};
exports.list = async (ctx) => {
    try {
        const posts = await Post.find().exec();
        ctx.body = posts;
    } catch (e) {
        ctx.throw(e, 500);
    }
};
exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(e, 500);
    }
};
exports.remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(e, 500);
    }
};
exports.update = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            ctx.request.body,
            //이 값을 설정해야 업데이트된 객체를 반환함.
            //설정하지 않으면 업데이트 되기 전의 객체를 반환함.
            { new: true }
        ).exec();

        //포스트가 존재하지 않을때
        if (!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(e, 500);
    }
};