const Branch = require('../models/BranchModel');
const mongoose = require('mongoose');

exports.get_all = (req, res, next)=>{
    Branch.find()
    .select('branchName branchAddress _id')
    .exec()
    .then(result=>{
        const response = {
            count: result.length,
            branches: result.map(result=>{
                return {
                    branchName: result.branchName,
                    branchAddress: result.branchAddress,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/branch/'+result._id
                    }
                }
            })
        }
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

exports.add_branch = (req, res, next)=>{
    console.log(req.userData);
    Branch.find({branchName: req.body.branchName, branchAddress: req.body.branchAddress})
    .exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message: "You have already added this branch and address"
            });
        }else{
          const branch = new Branch({
              _id: new mongoose.Types.ObjectId,
              branchName: req.body.branchName,
              branchAddress: req.body.branchAddress
          });
          branch.save().then(result => {
              console.log(result)
              res.status(201).json({
                  message: "Handling POST request to /products",
                  createdBranch: {
                      branchName: result.branchName,
                      branchAddress: result.branchAddress,
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

exports.get_single_branch = (req, res, next) =>{
    var id = req.params.branchId;
    console.log(id);
    Branch.findById({"_id":id})
    .select("branchName branchAddress _id")
    .exec()
    .then(doc =>{
        console.log(doc)
        if(doc){
            res.status(201).json({
                message: "Handling GET request to /products/:id",
                createdBranch: doc,
            });
        }else{
            res.status(404).json({
                 message: "No valid entry found for this provided id",
            });
        }
    }).catch(err=>{ res.status(500).json({ error:err}); });
}

exports.update_branch = (req, res, next) =>{
    const id = req.params.branchid;
    const updateOps = {};
    console.log(id)
    console.log(req.body)
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // }

    Branch.update({"_id":id}, {$set: req.body})
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

exports.delete_branch = (req, res, next) =>{
    const id = req.params.branchid;
    console.log(id);
    Branch.remove({_id: id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Branch Deleted Successfully',
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });

}
