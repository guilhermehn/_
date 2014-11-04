var reduce = require('./reduce');

function maxWrapper (a, b) {
  return Math.max(a, b);
}

function max (xs) {
  'use strict';

  return reduce(maxWrapper, xs, -Infinity);
}

module.exports = max;
