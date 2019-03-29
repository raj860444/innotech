const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Product = require('../models/product');
const BranchController = require('../controller/BranchController');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


router.get('/', BranchController.get_all);

router.post('/add_branch',  checkAuth, BranchController.add_branch);

router.get('/get_single_branch/:branchId', BranchController.get_single_branch);

router.patch('/update_branch/:branchid',  checkAuth, BranchController.update_branch);

router.delete('/delete_branch/:branchid',  checkAuth, BranchController.delete_branch);

module.exports = router;
