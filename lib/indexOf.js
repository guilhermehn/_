function indexOf (value, xs) {
  'use strict';

  if (typeof xs !== 'undefined') {
    return xs.indexOf(value)
  }

  return indexOf.bind(null, value)
}

module.exports = indexOf
