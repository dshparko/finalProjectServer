const {Schema, model, ObjectId} = require("mongoose");

const Post = new Schema({
    reviewTitle: {type: String, required: true },

    workTitle: {type: String, required: true },

    text: {type: String, required: true },

    teg: {type: String, required: true },

    group: {type: String, required: true },

    starCount: {type: Number, required: true }
})

module.exports = model('Post', Post)
