var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

// [SH] Bring in the data model
require('./models/db');
// [SH] Bring in the Passport config after model is defined
require('./config/passport');

var routes = require('./routes/index');
var dashRout = require('./routes/dashboard.route');
var indexRout = require('./routes/indexData.route');
var userRout = require('./routes/user.route');
var ideaRout = require('./routes/idea.route');
var settingsRout = require('./routes/settings.route');
var messagesRout = require('./routes/messages.route');

var app = express();

// [FW] already defined in models/db
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/attDB', function(err) {
//     if(err) {
//         console.log('connection error', err);
//     } else {
//         console.log('connection successful');
//     }
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/api', routes);
app.use('/api/indexData', indexRout);
app.use('/api/dashboardData', dashRout);
app.use('/api/userData', userRout);
app.use('/api/ideaData', ideaRout);
app.use('/api/settingData', settingsRout);
app.use('/api/messagesData', messagesRout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
