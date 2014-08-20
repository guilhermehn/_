function once (fn, context) {
  'use strict';

  var result

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments)
      fn = null
    }

    return result
  }
}

module.exports = once
