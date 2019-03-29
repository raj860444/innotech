const Currency = require('../models/CurrencyModel');
const mongoose = require('mongoose');

exports.get_all = (req, res, next) => {
    Currency.find()
    .select('currency_code currency_symbol decimal_places format _id')
    .exec()
    .then(result=>{
        const response = {
            count: result.length,
            currency: result.map(result=>{
                return {
                    currency_code: result.page_name,
                    currency_symbol: result.title,
                    decimal_places: result.url,
                    format: result.meta_keyword,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/currency/'+result._id
                    }
                }
            })
        }
             res.status(200).json({
                message: 'Handling GET request to /currency',
                result: response
            });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    });
}

exports.addCurrency = (req, res, next) => {
  console.log(req.userData);
  Currency.find({currency_code: req.body.currency_code})
  .exec()
  .then(currency=>{
      if(currency.length>=1){
          return res.status(409).json({
              message: "You have already added this branch and address"
          });
      }else{
        const currency = new Currency({
            _id: new mongoose.Types.ObjectId,
            currency_code: req.body.currency_code,
            currency_symbol: req.body.currency_symbol,
            decimal_places: req.body.decimal_places,
            format: req.body.format
        });
        currency.save().then(result => {
            console.log(result)
            res.status(201).json({
                message: "Handling POST request to /products",
                createdCurrency: {
                  currency_code: result.page_name,
                  currency_symbol: result.title,
                  decimal_places: result.url,
                  format: result.meta_keyword,
                  _id: result._id,
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

exports.get_single_currency = (req, res, next) => {
  var id = req.params.currencyId;
  console.log(id);
  Cms.findById({"_id":id})
  .select("page_name title url meta_keyword meta_desc content _id")
  .exec()
  .then(doc =>{
      console.log(doc)
      if(doc){
          res.status(201).json({
              message: "Handling GET request to /products/:id",
              createdCurrency: doc,
          });
      }else{
          res.status(404).json({
               message: "No valid entry found for this provided id",
          });
      }
  }).catch(err=>{ res.status(500).json({ error:err}); });
}

exports.update_currency = (req, res, next) => {
  const id = req.params.currencyId;
  console.log(id)
  console.log(req.body)
  Currency.update({"_id":id}, {$set: req.body})
  .exec()
  .then(doc=>{
      res.status(200).json({
          message: "Currency with "+id+" updated",
      })
  })
  .catch(err=>{
      res.status(500).json({
          message: "There was an error in updating the product",
          error: err
      })
  });
}

exports.delete_currency = (req, res, next) => {
  const id = req.params.currencyId;
  console.log(id);
  Currency.remove({_id: id})
  .exec()
  .then(result=>{
      res.status(200).json({
          message: 'Currency Deleted Successfully',
      });
  })
  .catch(err=>{
      res.status(500).json({
          error: err
      });
  });
}
