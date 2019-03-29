const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Product = require('../models/product');
const CurrencyController = require('../controller/CurrencyController');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


router.get('/', checkAuth, CurrencyController.get_all);

router.post('/addCurrency',  checkAuth, CurrencyController.addCurrency);

router.get('/get_single_currency/:currencyId', CurrencyController.get_single_currency);

router.patch('/update_currency/:currencyId',  checkAuth, CurrencyController.update_currency);

router.delete('/delete_currency/:currencyId',  checkAuth, CurrencyController.delete_currency);

module.exports = router;
