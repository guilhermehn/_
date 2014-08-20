var classNames = require('./classNames')
  , isFunction = require('./isFunction')
  , isObject = require('./isObject')
  , isArguments = require('./isArguments')
  , keys = require('./keys')

function isEmpty (value) {
  'use strict';

  var result = true

  if (!value) {
    return result
  }

  var className = Object.prototype.toString.call(value)
    , length = value.length

  if ((className === classNames.arrayClass || className === classNames.stringClass ||
      (isArguments(value))) ||
      (className === classNames.objectClass && typeof length === 'number' && isFunction(value.splice))) {
    return !length;
  }

  if (isObject(value)) {
    return keys(value).length === 0
  }

  return result
}

module.exports = isEmpty
