const express = require('express');
const path = require('path')
const router = express.Router();
// const mongoose = require('mongoose');
// const Product = require('../models/product');
const AdmissionController = require('../controller/AdmissionController');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/studentImages')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

router.get('/:class/:section', checkAuth, AdmissionController.get_all);

router.post('/add_admission',checkAuth, upload.single('studentImage'), AdmissionController.add_admission);

router.get('/:admissonId', checkAuth, AdmissionController.get_single_adminssion);
//
 router.patch('/update_admission/:admissionId',  checkAuth,  upload.single('studentImage'), AdmissionController.update_admission);
//
 router.delete('/delete_admisson/:admissionId',  checkAuth, AdmissionController.delete_admisson);

module.exports = router;
