let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

let User = mongoose.model('User', userSchema);

module.exports = User;