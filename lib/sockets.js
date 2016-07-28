'use strict';

const socket = require('koa-socket');

module.exports = function(app) {
    const shoutout = new socket({
        namespace: 'shoutout'
    });

    shoutout.attach(app);

    return {
        "shoutout": shoutout
    };
}