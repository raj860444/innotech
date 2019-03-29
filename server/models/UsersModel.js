const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true, max: 100},
    password: {type: String, required: true},
    profileImageName: {type:String},
    profileImagePath: {type:String},
    type: {type:String},
    name: {type:String},
    mobile: {type:String},
    resettoken: {type:String}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);
