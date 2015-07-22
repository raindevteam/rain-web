"use strict";

const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const http         = require('http');
const path         = require('path');

const app    = express();
const server = http.createServer(app);

var io = require('socket.io')(server);
io     = require('./lib/sockets')(io);

app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const index     = require(__dirname + '/app/routes/index');
const userguide = require(__dirname + '/app/routes/userguide');
const about     = require(__dirname + '/app/routes/about');
const console   = require(__dirname + '/app/routes/console');

app.set('menu', {
    'Home'        : '/',
    'Console'     : '/console',
    'User Guide'  : '/userguide',
    'About'       : '/about'
  }
);

app.use(function(req, res, next) {
  app.set('selected', req.originalUrl);
  return next();
});

app.use('/', index);
app.use('/userguide', userguide);
app.use('/about', about);
app.use('/console', console);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = 'Seems we couldn\'t find the page you requested!';
  return next(err);
});

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktraces leaked to user
app.use (function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(8080, '127.0.0.1');
