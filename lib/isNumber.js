var toString = Object.prototype.toString;

/* http://lodash.com/docs#isNumber <3 */

function isNumber (value) {
  'use strict';

  return typeof value === 'number' || value && typeof value === 'object' && toString.call(value) === '[object Number]' || false;
}

module.exports = isNumber;
