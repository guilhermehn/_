var objProto = Object.prototype;

function isArguments (value) {
  return value && typeof value === 'object' && typeof value.length === 'number' && objProto.hasOwnProperty.call(value, 'callee') && !objProto.propertyIsEnumerable.call(value, 'callee') || false;
}

module.exports = isArguments;
