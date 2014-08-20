var _map = Array.prototype.map

function map (fn, xs) {
  'use strict';

  if (typeof xs !== 'undefined') {
    return _map.call(xs, fn, xs)
  }

  return map.bind(null, fn)
}

module.exports = map
