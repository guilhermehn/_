var isFunction = require('./isFunction')

function not (fn) {
  if (isFunction(fn)) {
    return function () {
      return !fn.apply(this, arguments)
    }
  }

  return !fn
}

module.exports = not
