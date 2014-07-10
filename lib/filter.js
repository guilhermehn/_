var _filter = Array.prototype.filter

function filter (fn, list) {
  if (typeof list !== 'undefined') {
    return _filter.call(list, fn)
  }

  return filter.bind(this, fn)
}

module.exports = filter