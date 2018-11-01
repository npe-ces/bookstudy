const mongoose = require('mongoose');

const { Schema } = mongoose;
/*
String 문자열        
 Number 숫자         
 Date 날짜         
 Buffer 파일을 담을 수 있는 버퍼         
 Boolean true 또는 false 값         
 Mixed(Schema.Types.Mixed) 어떤 데이터도 넣을 수 있는 형식         
 ObjectId(Schema.Types.ObjectId) 객체 아이디, 주로 다른 객체를 참조할 때 넣음         
 Array 배열 형태의 값으로 [ ]로 감싸서     
*/
const Post = new Schema({
    title: String,
    body: String,
    tags: [String],//array
    publishedDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Post', Post);