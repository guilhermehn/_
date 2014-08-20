var _filter = Array.prototype.filter

function filter (fn, list) {
  'use strict';

  if (typeof list !== 'undefined') {
    return _filter.call(list, fn)
  }

  return filter.bind(null, fn)
}

module.exports = filter
