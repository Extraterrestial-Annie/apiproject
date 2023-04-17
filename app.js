var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var uri = 'mongodb://127.0.0.1:27017/songs';

mongoose.connect(uri);
mongoose.set("strictQuery", false);


var indexRouter = require('./routes/index')
var addRouter = require('./routes/add');
var allsongsRouter = require('./routes/allsongs');
var deleteRouter = require('./routes/delete')
var songRouter = require('./routes/song');
var updateRouter = require('./routes/update');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/add', addRouter);
//app.use('/allsongs', allsongsRouter);
///app.use('/delete', deleteRouter);
app.use('/api', songRouter);
//app.use('/update', updateRouter)

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
