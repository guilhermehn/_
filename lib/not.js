var isFunction = require('./isFunction')

function not (fn) {
  'use strict';

  if (isFunction(fn)) {
    return function () {
      return !fn.apply(this, arguments)
    }
  }

  return !fn
}

module.exports = not
