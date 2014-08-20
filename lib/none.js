var some = require('./some')

function none (fn, xs) {
  'use strict';

  if (typeof xs !== 'undefined') {
    return !some(fn, xs)
  }

  return none.bind(null, fn)
}

module.exports = none
