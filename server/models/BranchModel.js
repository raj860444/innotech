const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    branchName: {type:String, Required:true},
    branchAddress:{type:String, Required:true}
});

module.exports = mongoose.model('Branch', branchSchema);
