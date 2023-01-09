const {Schema, model} = require("mongoose")

const Comment = new Schema({
    time:  {type: String},
    postId: {type: String, defaultValue: '63b9aea97ee6e3c6d7315016'},
    text: {type: String},
    userName: {type: String}
})

module.exports = model('Comment', Comment)