var classNames = require('./classNames');
var isFunction = require('./isFunction');
var isObject = require('./isObject');
var isArguments = require('./isArguments');
var keys = require('./keys');

function isEmpty (value) {
  var result = true;

  if (!value) {
    return result;
  }

  var className = Object.prototype.toString.call(value);
  var length = value.length;

  if ((className === classNames.arrayClass || className === classNames.stringClass || (isArguments(value))) || (className === classNames.objectClass && typeof length === 'number' && isFunction(value.splice))) {
    return !length;
  }

  if (isObject(value)) {
    return keys(value).length === 0;
  }

  return result;
}

module.exports = isEmpty;
