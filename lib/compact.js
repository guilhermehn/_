var filter = require('./filter')

function compact (xs) {
  'use strict';

  return filter(function (x) {
    return !!x
  }, xs)
}

module.exports = compact
