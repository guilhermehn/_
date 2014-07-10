var _map = Array.prototype.map

function map (fn, xs) {
  if (typeof xs !== 'undefined') {
    return _map.call(xs, fn, xs)
  }

  return map.bind(this, fn)
}

module.exports = map