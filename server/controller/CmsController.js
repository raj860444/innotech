const Cms = require('../models/CmsModel');
const mongoose = require('mongoose');

exports.get_all = (req, res, next) => {
    Cms.find()
    .select('page_name title url meta_keyword meta_desc content _id')
    .exec()
    .then(result=>{
        const response = {
            count: result.length,
            cms: result.map(result=>{
                return {
                    page_name: result.page_name,
                    title: result.title,
                    url: result.url,
                    meta_keyword: result.meta_keyword,
                    title: result.title,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/cms/'+result._id
                    }
                }
            })
        }
             res.status(200).json({
                message: 'Handling GET request to /cms',
                result: response
            });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
}

exports.addCms = (req, res, next) => {
  console.log(req.userData);
  Cms.find({page_name: req.body.page_name})
  .exec()
  .then(cms=>{
      if(cms.length>=1){
          return res.status(409).json({
              message: "You have already added this branch and address"
          });
      }else{
        const cms = new Cms({
            _id: new mongoose.Types.ObjectId,
            page_name: req.body.page_name,
            title: req.body.title,
            url: req.body.url,
            meta_keyword: req.body.meta_keyword,
            meta_desc: req.body.meta_desc,
            content: req.body.content,
        });
        cms.save().then(result => {
            console.log(result)
            res.status(201).json({
                message: "Handling POST request to /products",
                createdCms: {
                  page_name: result.page_name,
                  title: result.title,
                  url: result.url,
                  meta_keyword: result.meta_keyword,
                  title: result.title,
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

exports.get_single_cms = (req, res, next) => {
  var id = req.params.cmsId;
  console.log(id);
  Cms.findById({"_id":id})
  .select("page_name title url meta_keyword meta_desc content _id")
  .exec()
  .then(doc =>{
      console.log(doc)
      if(doc){
          res.status(201).json({
              message: "Handling GET request to /products/:id",
              createdCms: doc,
          });
      }else{
          res.status(404).json({
               message: "No valid entry found for this provided id",
          });
      }
  }).catch(err=>{ res.status(500).json({ error:err}); });
}

exports.update_cms = (req, res, next) => {
  const id = req.params.cmsId;
  console.log(id)
  console.log(req.body)
  Cms.update({"_id":id}, {$set: req.body})
  .exec()
  .then(doc=>{
      res.status(200).json({
          message: "Cms with "+id+" updated",
      })
  })
  .catch(err=>{
      res.status(500).json({
          message: "There was an error in updating the product",
          error: err
      })
  });
}

exports.delete_cms = (req, res, next) => {
  const id = req.params.cmsId;
  console.log(id);
  Cms.remove({_id: id})
  .exec()
  .then(result=>{
      res.status(200).json({
          message: 'Cms Deleted Successfully',
      });
  })
  .catch(err=>{
      res.status(500).json({
          error: err
      });
  });
}
