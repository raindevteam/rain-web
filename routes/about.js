'use strict';

const router  = require('koa-router')();

router
  .get('/about', function *(next) {
    yield this.render('about', { title: 'Rain | About' });
  });

module.exports = router;
