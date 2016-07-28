'use strict';

const router = require('koa-router')();

router
  .get('/', function *(next) {
    yield this.render('index', { title: 'Rain' });
  });

module.exports = router;
