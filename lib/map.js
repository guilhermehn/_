var nativeMap = Array.prototype.map;

function map (fn, xs) {
  'use strict';

  if (typeof xs !== 'undefined') {
    return nativeMap.call(xs, fn, xs);
  }

  return map.bind(null, fn);
}

module.exports = map;
