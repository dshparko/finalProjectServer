const {Schema, model} = require("mongoose")

const Tag = new Schema({
    tag: {type: String},
})

module.exports = model('Tag', Tag)