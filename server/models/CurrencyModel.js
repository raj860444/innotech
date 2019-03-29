const mongoose = require('mongoose');

const currencySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    currency_code: {type:String, Required:true},
    currency_symbol:{type:String, Required:true},
    decimal_places:{type:String, Required:true},
    format:{type:String, Required:true}
});

module.exports = mongoose.model('Currency', currencySchema);
