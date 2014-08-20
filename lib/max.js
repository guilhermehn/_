var reduce = require('./reduce')

function _max (a, b) {
  'use strict';

  return Math.max(a, b)
}

function max (xs) {
  'use strict';

  return reduce(_max, xs, -Infinity)
}

module.exports = max
