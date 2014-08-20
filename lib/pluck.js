var property = require('./property')
  , map = require('./map')

function pluck (key, list) {
  'use strict';

  var getKey = property(key)
    , mapKey = map(getKey)

  if (typeof list !== 'undefined') {
    return mapKey(list)
  }

  return mapKey
}

module.exports = pluck
