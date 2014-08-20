var isObject = require('./isObject')

function keys (obj) {
  'use strict';

  if (!isObject(obj)) {
    return []
  }

  return Object.keys(obj)
}

module.exports = keys
