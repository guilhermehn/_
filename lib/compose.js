var toArray = require('./toArray')

function compose () {
  'use strict';

  var fns = toArray(arguments)
    , length = fns.length

  return function (result) {
    var i = length

    while (--i >= 0) {
      result = fns[i].call(this, result)
    }

    return result
  }
}

module.exports = compose
