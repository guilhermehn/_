function curry (fn, length) {
  // capture fn's # of parameters
  length = length || fn.length
  return function () {
    if (arguments.length < length) {
      // not all arguments have been specified. Curry once more.
      var combined = [fn].concat(toArray(arguments))
      return length - arguments.length > 0
        ? curry(sub_curry.apply(this, combined), length - arguments.length)
        : sub_curry.call(this, combined)
    }
    else {
      // all arguments have been specified, actually call function
      return fn.apply(this, arguments)
    }
  }
}

module.exports = curry