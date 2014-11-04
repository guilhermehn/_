var nativeEvery = Array.prototype.every;

function every (fn, list) {
  'use strict';

  if (typeof list !== 'undefined') {
    return nativeEvery.call(list, fn);
  }

  return every.bind(null, fn);
}

module.exports = every;
