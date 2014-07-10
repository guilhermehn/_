var subCurry = require('./subCurry')
  , toArray = require('./toArray')

function curry (fn, length) {
  length = length || fn.length

  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(toArray(arguments))
      return length - arguments.length > 0
        ? curry(subCurry.apply(this, combined), length - arguments.length)
        : subCurry.call(this, combined )
    }
    else {
      return fn.apply(this, arguments)
    }
  }
}

module.exports = curry