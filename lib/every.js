var _every = Array.prototype.every

function every (fn, list) {
  if (typeof list !== 'undefined') {
    return _every.call(list, fn)
  }

  return every.bind(this, fn)
}

module.exports = every