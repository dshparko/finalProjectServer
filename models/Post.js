const {Schema, model} = require("mongoose");

const Post = new Schema({

    mark: {type: String, default: '4'},
    userName: {type: String, required: true},

    time: {type: String, required: true},

    reviewTitle: {type: String, required: true},

    workTitle: {type: String, required: true},

    text: {type: String, required: true},

    teg: {type: Array, required: true},

    group: {type: String, required: true},

    starCount: {type: Number, required: true},

    imgUrl: {type: String, required: true},

    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

const comment = new Schema({
    time: {type: String},
    postId: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    text: {type: String},
    userName: {type: String}
})
const Comment = model('Story', comment);
module.exports = model('Post', Post)
