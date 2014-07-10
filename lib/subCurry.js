var toArray = require('./toArray')

function subCurry(fn) {
  var args = [].slice.call(arguments, 1)
  return function () {
    return fn.apply(this, args.concat(toArray(arguments)))
  }
}

module.exports = subCurry