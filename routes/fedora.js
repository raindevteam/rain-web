'use strict';

const router  = require('koa-router')();

router
  .get('/fedora', function *(next) {
    yield this.render('fedora', { title: 'Yah Spin Meh' });
  });

module.exports = router;
