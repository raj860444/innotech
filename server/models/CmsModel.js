const mongoose = require('mongoose');

const cmsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    page_name: {type:String, Required:true},
    title:{type:String, Required:true},
    url:{type:String, Required:true},
    meta_keyword:{type:String, Required:true},
    meta_desc:{type:String, Required:true},
    content:{type:String, Required:true},
});

module.exports = mongoose.model('Cms', cmsSchema);
