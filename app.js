var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./flask/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile); //new
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// app.use('/',express.static(path.join(__dirname, 'dist')));
app.use('/rest', indexRouter);
// app.use('/users', usersRouter);

/* rest API */
app.use('/api/call', require('./routes/call'));
app.use('/api/call2', require('./routes/call2.js'));
app.use('/api/dataCall', require('./routes/dataCall.js'));
app.use('/api/call3', require('./routes/call3.js'))
app.use('/api/test', require('./routes/test.js'))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('err', err)
  console.log('res.locals.error', res.locals.error)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
