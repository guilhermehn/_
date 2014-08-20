var reduce = require('./reduce')

function _min (a, b) {
  'use strict';

  return Math.min(a, b)
}

function min (xs) {
  'use strict';

  return reduce(_min, xs, Infinity)
}

module.exports = min
