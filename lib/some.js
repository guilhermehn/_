var _some = Array.prototype.some

function some (fn, xs) {
  'use strict';

  if (typeof xs !== 'undefined') {
    return _some.call(xs, fn)
  }

  return some.bind(null, fn)
}

module.exports = some
