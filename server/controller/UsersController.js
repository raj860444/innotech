const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');
const nodemailer = require('nodemailer');
const fs = require('fs');


exports.users = (req, res, next)=>{
  User.find().select('name email _id')
  .exec()
  .then(result=>{
        console.log(result)
        const response = {

            count: result.length,
            users: result.map(result=>{
                return {
                    name: result.name,
                    email: result.email,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/user/'+result._id
                    }
                }
            })
        }
             res.status(200).json({
                message: 'Handling GET request to /user',
                result: response
            });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
}

//Simple version, without validation or sanitation
exports.signup = (req, res, next)=>{
    console.log(req.body)
    User.find({email:req.body.email , type : req.body.type})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: "Mail Exists"
            });
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
               if(err){
                   return res.status(500).json({
                        error: err
                   })
               }
               else{
                   const user = new User({
                                            _id: new mongoose.Types.ObjectId(),
                                            email: req.body.email,
                                            password: hash,
                                            type: req.body.type
                                        });
                    user.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: "User Created",
                            createdProduct: {
                                email: result.email,
                                password: result.password,
                                _id: result._id,
                                request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/users/'+result._id
                                }
                            }
                        });
                    })
                    .catch(err=>{
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                });
                            });
               }
            });
        }
    });
}

exports.login = (req, res, next)=>{
    //console.log(req.body)

    User.find({email: req.body.email , type: req.body.type})
    .exec()
    .then(user =>{
        //console.log(user);
        if(user.length<1){
            return res.status(401).json({
                message: 'User doesn\'t exist'
            });
        }else{
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if(err){
                    return res.status(401).json({
                        error:"Auth failed"
                    });
                }
                if(result){
                    result=user[0];
                    result.password='';
                    const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    "secret",
                    {
                      expiresIn: "1h"
                    }
                    );
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token,
                        data: user[0]
                    });
                }
                return res.status(401).json({
                    error:"Auth failed"
                });
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
}

exports.user_delete_user = (req, res, next) =>{
    const id = req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result=>{
        if(result.length>=1){
            res.status(200).json({
            message: 'Deleted User',
            request:{
                type: "POST",
                body: {
                    type: 'POST',
                    url: "localhost:3000/user/signup",
                    body: {email: 'String', password: 'String'}
                }
            }
        });
        }else{
            res.status(404).json({
                message: 'User Not found'
            });
        }

    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });

}
exports.profile=(req, res, next)=>{
    //console.log(req.userData.userId)
    User.findById(req.userData.userId)
    .select('name email mobile profileImageName profileImagePath _id')
    .exec()
    .then(result=>{
             res.status(200).json({
                message: 'Handling GET request to /branches',
                result: result
            });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
}
exports.changeImage=(req, res, next)=>{
  //console.log(req.file)
  //console.log(req.userData.userId)
  User.findById(req.userData.userId)
  .select('_id')
  .exec()
  .then(result=>{
              console.log(result);
              //fs.unlinkSync(result.profileImagePath);
              User.update({
                        _id: req.userData.userId
                      }, {
                      $set: {
                        "profileImageName":"http://localhost:3000/adminImages/"+req.file.filename,
                        "profileImagePath":req.file.path
                      }
                  }).then(result=>{
                    console.log(result)
                    res.status(200).json({
                       message: 'Handling GET request to /branches',
                       result: "http://localhost:3000/adminImages/"+req.file.filename
                   });
                }).catch(err=>{
                    res.status(500).json({
                        error: err
                    })
                });

  })
  .catch(err=>{
      res.status(500).json({
          error: err
      })
  });
}

exports.updateProfile = (req, res, next)=>{
  console.log(req.userData.userId)
  console.log(req.body)
  User.updateOne({_id: req.userData.userId}, req.body)
  .then(result=>{
      res.status(200).json({
         message: 'Handling GET request to /branches',
         result: result
     });
  })
  .catch(err=>{
    res.status(500).json({
        error: err
    })
  })
}

exports.changePassword = (req, res, next)=>{
  console.log(req.userData.userId)
  console.log(req.body)
  User.find({_id: req.userData.userId})
  .exec()
  .then(user =>{
      //console.log(user);
      if(user.length<1){
          return res.status(401).json({
              message: 'Mail not found, User doesn\'t exist'
          });
      }else{
        bcrypt.compare(req.body.oldPassword, user[0].password, function(err, result) {
            if(err){
                return res.status(401).json({
                    error:"Auth failed"
                });
            }
            if(result){
              bcrypt.hash(req.body.newPassword, 10, function(err, hash) {
                  if(err){
                    return res.status(401).json({
                        error:"Auth failed"
                    });
                  }
                  else {
                    User.updateOne({_id: req.userData.userId}, {password:hash})
                    .then(result=>{
                        res.status(200).json({
                           message: 'Handling GET request to /branches',
                           result: result
                       });
                    })
                    .catch(err=>{
                      res.status(500).json({
                          error: err
                      })
                    })
                  }
              });
            }
        });
      }
    })
    .catch(err=>{
      res.status(500).json({
          error: err
      })
    })
}
exports.forgotPassword = (req, res, next)=>{
  console.log(req.body)
  var d = new Date();
  var resetToken = d.getTime();
  var resetLink = 'http://localhost:4200/reset-password/'+resetToken
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abhishek@braintechnosys.com',
      pass: '1AbhiGupta'
    }
  });

  var mailOptions = {
    from: 'abhishek@braintechnosys.com',
    to: req.body.email,
    subject: 'Welcome User',
    text: '<h1>Welcome</h1><p>Please open the following url</p><a href="'+resetLink+'">Click Here</a> To reset the password'
  };
  User.find({email: req.body.email})
  .exec()
  .then(user =>{
      //console.log(user);
      if(user.length<1){
          return res.status(401).json({
              message: 'Mail not found, User doesn\'t exist'
          });
      }else{
        User.updateOne({email: req.body.email}, {resettoken:resetToken})
        .then(result=>{
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
            res.status(200).json({
               message: 'Handling GET request to /branches',
               result: result
           });
        })
        .catch(err=>{ 
          res.status(500).json({
              error: err
          })
        })
      }
    })
    .catch(err=>{
      res.status(500).json({
          error: err
      })
    })

}

exports.resetPassword = (req, res, next)=>{
  var restetoken = req.params.resettoken;
  console.log(restetoken)
  console.log(req.body)
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if(err){
      return res.status(401).json({
          error:"Auth failed"
      });
    }
    else {
      User.updateOne({resettoken: restetoken}, {password:hash, resettoken: ''})
      .then(result=>{
          res.status(200).json({
             message: 'Handling GET request to /branches',
             result: result
         });
      })
      .catch(err=>{
        res.status(500).json({
            error: err
        })
      })
    }
  })
}
