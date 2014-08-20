var _reduce = Array.prototype.reduce

function reduce (fn, xs, start) {
  'use strict';

  if (typeof xs !== 'undefined') {
    return _reduce.call(xs, fn, start)
  }

  return function (xs, start) {
    return _reduce.call(xs, fn, start)
  }
}

module.exports = reduce
