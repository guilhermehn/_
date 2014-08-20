var reduce = require('./reduce')
  , isNumber = require('./isNumber')

function sumIfIsNumber (a, b) {
  'use strict';

  return isNumber(b) ? a + b : a
}

function sumAll (xs) {
  'use strict';

  return reduce(sumIfIsNumber, xs, 0)
}

module.exports = sumAll
