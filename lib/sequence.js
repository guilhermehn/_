var toArray = require('./toArray')

function sequence () {
  var fns = toArray(arguments)
    , length = fns.length

  return function (result) {
    var i = -1

    while (++i < length) {
      result = fns[i].call(this, result)
    }

    return result
  }
}

module.exports = sequence