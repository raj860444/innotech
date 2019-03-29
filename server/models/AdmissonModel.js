const mongoose = require('mongoose');
const Branch = require('./BranchModel');
const admissionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {type:String, Required:true},
    middleName:{type:String},
    lastName: {type:String},
    dob: {type:String, Required:true},
    gender: {type:String, Required:true},
    religion: {type:String, Required:true},
    nationality: {type:String, Required:true},
    class: {type:String, Required:true},
    section: {type:String, Required:true},
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    previousSchool: {type:String},
    previousClass: {type:String},
    previousSchoolAddress: {type:String},
    aadhar: {type:String, Required:true},
    studentImagePath: {type:String, Required:true},
    studentImageName: {type:String, Required:true},
    sibling: [{type:String}]
});

module.exports = mongoose.model('Admission', admissionSchema);
