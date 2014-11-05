// http://lodash.com/docs#isString <3

function isString (value) {
  return typeof value === 'string' || value && typeof value === 'object' && Object.prototype.toString.call(value) === '[object String]' || false;
}

module.exports = isString;
