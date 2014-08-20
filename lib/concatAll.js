var reduce = require('./reduce')
  , concat = require('./concat')
  , toArray = require('./toArray')

function concatAll () {
  'use strict';

  return reduce(concat, toArray(arguments), [])
}

module.exports = concatAll
