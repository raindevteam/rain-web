'use strict';

const router = require('koa-router')();

router
  .get('/rml', function *(next) {
    yield this.render('rml', { title: 'Rain | RML' });
  });

module.exports = router;