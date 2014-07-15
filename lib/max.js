var reduce = require('./reduce')

function _max (a, b) {
  return Math.max(a, b)
}

function max (xs) {
  return reduce(_max, xs, -Infinity)
}

module.exports = max