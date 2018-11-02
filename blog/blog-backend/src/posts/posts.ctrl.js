const Post = require('../model/post');
const Joi = require('joi');
const {ObjectId} = require('mongoose').Types;


//가장먼저 실행되면서 id값에 대한 검증을 하는 함수
exports.checkObjectId = (ctx, next) => {
    const {id} = ctx.params;

    //검증실패
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return null;
    }
    return next();
};


exports.list = async (ctx) => {
    //page가 없다면 1로 간주함
    //쿼리는 문자열형태로만 받아오무르 숫자료 변환
    const page = parseInt(ctx.query.page || 1, 10);

    //숫자가 이상하면 오류
    if (page < 1) {
        ctx.status = 400;
        return;
    }

    try {
        //sort의 경우 id의 내림차순 정렬을 이렇게 표기한다. 오름차순은 1
        const posts = await Post.find()
            .sort({_id: -1})
            .limit(10)
            .skip((page - 1) * 10)
            .lean()//json형태로데이터 반환
            .exec();
        const postCount = await Post.countDocuments().exec();

        //데이터를 자른다.
        const limitBodyLength = post => ({
            ...post,
            body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
        });
        ctx.body = posts.map(limitBodyLength);
        //마지막 페이지 알려주기
        //ctx.set은 response header를 설정
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = posts;
    } catch (e) {
        ctx.throw(e, 500);
    }
};
exports.write = async (ctx) => {
    //객체가 지닌 값들을 검증함.
    const schema = Joi.object().keys({
        title: Joi.string().required(), //뒤에 required를 붙여주면 필수항목이라는 의미
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required()//문자열 배열 검증
    });

    //첫번째 파라미터는 검증할 객체, 두번째는 스키마
    const result = Joi.validate(ctx.request.body, schema);

    //오류 발생시 오류내용 응답
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {title, body, tags} = ctx.request.body;

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
exports.read = async (ctx) => {
    const {id} = ctx.params;
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
    const {id} = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(e, 500);
    }
};
exports.update = async (ctx) => {
    const {id} = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(
            id,
            ctx.request.body,
            //이 값을 설정해야 업데이트된 객체를 반환함.
            //설정하지 않으면 업데이트 되기 전의 객체를 반환함.
            {new: true}
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