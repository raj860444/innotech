const Admisson = require('../models/AdmissonModel');
const mongoose = require('mongoose');
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/studentImages')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

exports.get_all = (req, res, next)=>{
    // const token = req.headers.authorization.split(" ")[1];
    // const decoded = jwt.verify(token, "secret");
    // req.userData = decoded;
    //console.log(req.userData)
    //console.log(req.params.class+'======'+req.params.section)
  
    Admisson.find({ class: req.params.class, section: req.params.section})
    .select('sibling firstName middleName lastName dob gender religion nationality class section branch previousSchool previousClass previousSchoolAddress aadhar studentImagePath studentImageName  _id').populate('branch')
    .exec()
    .then(result=>{
        console.log(result)
        const response = {
            count: result.length,
            adminssions: result.map(result=>{
              return {
                    result,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/branch/'+result._id
                    }
                }
            })
        }
        console.log(response);
             res.status(200).json({
                message: 'Handling GET request to /branches',
                result: response
            });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
}

exports.add_admission = (req, res, next)=>{
    console.log(req.file);
    Admisson.find({aadhar: req.body.aadhar})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: "You have already added this branch and address"
            });
        }else{
          const admission = new Admisson({
              _id: new mongoose.Types.ObjectId,
              firstName: req.body.firstName,
              branchAddress: req.body.branchAddress,
              middleName: req.body.middleName,
              lastName: req.body.lastName,
              dob: req.body.dob,
              gender: req.body.gender,
              religion: req.body.religion,
              nationality: req.body.nationality,
              class: req.body.class,
              section: req.body.section,
              branch: req.body.branch,
              previousSchool: req.body.previousSchool,
              previousClass: req.body.previousClass,
              previousSchoolAddress: req.body.previousSchoolAddress,
              aadhar: req.body.aadhar,
              studentImagePath: req.file.path,
              studentImageName: "http://localhost:3000/studentImages/"+req.file.filename,
              sibling: req.body.sibling,
          });
          admission.save().then(result => {
              //console.log(result)
              res.status(201).json({
                  message: "Handling POST request to /products",
                  createdBranch: {
                      firstName: result.firstName,
                      aadhar: result.aadhar,
                      _id: result._id
                  }
              });
          }).catch(err=>{
              console.log(err)
              res.status(500).json({
                  error: err
              });
          });
        }
    });
}

exports.get_single_adminssion = (req, res, next) =>{
    var id = req.params.admissonId;
    console.log(id);
    Admisson.findById({"_id":id}).
    select('sibling firstName middleName lastName dob gender religion nationality class section branch previousSchool previousClass previousSchoolAddress aadhar studentImagePath studentImageName  _id').populate('branch')
    .exec()
    .then(doc =>{
        console.log(doc)
        console.log(doc.createdBranch)
        if(doc){
            res.status(201).json({
                message: "Handling GET request to /admission/:id",
                createdBranch: doc,
            });
        }else{
            res.status(404).json({
                 message: "No valid entry found for this provided id",
            });
        }
    }).catch(err=>{ res.status(500).json({ error:err}); });
}

exports.update_admission = (req, res, next) =>{

    const id = req.params.admissionId;
    const updateOps = {};
    console.log(id)

    if(req.file){
      console.log(req.file.filename);
      req.body.studentImagePath= req.file.path;
      req.body.studentImageName= "http://localhost:3000/studentImages/"+req.file.filename;
    }else{
      delete req.body._id
      delete req.body.studentImage
    }
    console.log(req.body);
    Admisson.update({"_id":id}, {$set: req.body})
    .exec()
    .then(doc=>{
        res.status(200).json({
            message: "Branch with "+id+" updated",
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: "There was an error in updating the product",
            error: err
        })
    });
}

exports.delete_admisson = (req, res, next) =>{
    const id = req.params.admissionId;
    console.log(id);
    Admisson.remove({_id: id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Admisson Deleted Successfully',
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });

}
