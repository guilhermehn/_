var toArray = require('./toArray')
  , compose = require('./compose')

function sequence () {
  'use strict';

  return compose.apply(null, toArray(arguments).reverse())
}

module.exports = sequence
