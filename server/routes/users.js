var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controller/UsersController');
const path = require('path')
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/adminImages')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })


// a simple test url to check that all of our files are communicating correctly.
router.post('/login', user_controller.login);
router.post('/signup', user_controller.signup);
router.get('/admin', checkAuth, user_controller.profile);
router.get('/getall', checkAuth, user_controller.users);
router.post('/changeImage', checkAuth, upload.single('userImage'), user_controller.changeImage);
router.post('/updateProfile', checkAuth, user_controller.updateProfile);
router.post('/changePassword', checkAuth, user_controller.changePassword)
router.post('/forgotPassword', user_controller.forgotPassword)
router.post('/resetPassword/:resettoken', user_controller.resetPassword)
module.exports = router;
