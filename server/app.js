var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
mongoose.connect('mongodb://localhost/schoolAdmin', { useNewUrlParser: true }).then(()=>console.log('Mongoose up'));
const user = require('./routes/users'); // Imports routes
const branch = require('./routes/branch'); // Imports routes
const admission = require('./routes/admission'); // Imports routes
const cms = require('./routes/cms'); // Imports routes
const currency = require('./routes/currency'); // Imports routes
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', user);
app.use('/branch', branch);
app.use('/admission', admission);
app.use('/cms', cms);
app.use('/currency', currency);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
