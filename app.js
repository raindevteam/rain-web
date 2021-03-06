"use strict";

const koa    = require('koa');
const serve  = require('koa-static');
const render = require('koa-swig');
const stylus = require('koa-stylus');
const logger = require('koa-logger');
const path   = require('path');

var app = koa();

app.use(logger())
app.context.settings = {}

// Render with swig
app.context.render = render({
  root: path.join(__dirname, 'views'),
  cache: 'memory',
  ext: 'html',
  locals: app.context.settings
});

app.use(stylus({
  src: __dirname + '/stylus',
  dest: __dirname + '/public'
}))

app.use(serve(__dirname + '/public'));

app.context.settings.menu = {
  'Home'        : '/',
  'RML'         : '/rml',
  'User Guide'  : '/userguide',
  'About'       : '/about'
};

app.use(function *(next) {
  app.context.settings.selected = this.request.originalUrl;
  yield next;
});

// Routes
const index     = require(__dirname + '/routes/index');
const about     = require(__dirname + '/routes/about');
const userguide = require(__dirname + '/routes/userguide');
const rml       = require(__dirname + '/routes/rml');
const fedora    = require(__dirname + '/routes/fedora');

app.use(index.routes());
app.use(about.routes());
app.use(userguide.routes());
app.use(fedora.routes())

// If main module, run web server
if (require.main == module) {
  app.listen('8080');
// If ran as module, export app
} else {
  module.exports = app;
}
