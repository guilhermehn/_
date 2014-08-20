var objProto = Object.prototype

function isArguments (value) {
  'use strict';

  return value
      && typeof value === 'object'
      && typeof value.length === 'number'
      && objProto.hasOwnProperty.call(value, 'callee')
      && !objProto.propertyIsEnumerable.call(value, 'callee') || false;
}

module.exports = isArguments
