var map = require('./map')

function replace (indexes, xs) {
  if (typeof xs === 'undefined') {
    return replace.bind(this, indexes)
  }

  return map(function (i) {
    return xs[i]
  }, indexes)
}

module.exports = replace