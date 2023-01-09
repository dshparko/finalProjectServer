const {Schema, model} = require("mongoose");
const User = new Schema({
    userName:{type: String, required: true },
    status: {type: String},
    role: {type: String}
})

module.exports = model('User', User)