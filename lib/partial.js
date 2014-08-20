function partial (fn) {
  'use strict';

  var args = Array.prototype.slice.call(arguments, 1)
    , length = args.length
    , self = this //jshint ignore:line

  return function () {
    var arg = 0
      , l = arguments.length
      , i = -1

    for (; ++i < length && arg < l;) {
      if (args[i] === self || args[i] === undefined) {
        args[i] = arguments[arg++]
      }
    }

    return fn.apply(this, args)
  }
}

module.exports = partial
