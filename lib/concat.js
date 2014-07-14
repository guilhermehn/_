var map = require('./map')

function concat (a, b) {
  var args = map(function (i) {
    return Array.isArray(i) ? i : []
  }, [a, b])

  return args[0].concat(args[1])
}

module.exports = concat