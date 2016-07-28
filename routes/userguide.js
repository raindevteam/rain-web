'use strict';

const router  = require('koa-router')();

router
  .get('/userguide', function *(next) {
    yield this.render('userguide', { title: 'Rain | Userguide' });
  });

module.exports = router;
