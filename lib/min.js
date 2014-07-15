var reduce = require('./reduce')

function _min (a, b) {
  return Math.min(a, b)
}

function min (xs) {
  return reduce(_min, xs, Infinity)
}

module.exports = min
