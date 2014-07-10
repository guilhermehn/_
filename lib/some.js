var _some = Array.prototype.some

function some (fn, xs) {
  if (typeof xs !== 'undefined') {
    return _some.call(xs, fn)
  }

  return some.bind(this, fn)
}

module.exports = some