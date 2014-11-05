var nativeMap = Array.prototype.map;

function map (fn, xs) {
  if (typeof xs !== 'undefined') {
    return nativeMap.call(xs, fn, xs);
  }

  return map.bind(null, fn);
}

module.exports = map;
