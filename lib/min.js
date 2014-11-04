var reduce = require('./reduce');

function minWrapper (a, b) {
  return Math.min(a, b);
}

function min (xs) {
  return reduce(minWrapper, xs, Infinity);
}

module.exports = min;
