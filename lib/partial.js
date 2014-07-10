function partial (fn) {
  var args = Array.prototype.slice.call(arguments, 1)
    , self = this

  return function () {
    var arg = 0
      , i = 0

    for (; i < args.length && arg < arguments.length; i++) {
      if (args[i] === self || args[i] === undefined) {
        args[i] = arguments[arg++]
      }
    }

    return fn.apply(this, args)
  }
}

module.exports = partial