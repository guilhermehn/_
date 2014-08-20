function property (key) {
  'use strict';

  return function (object) {
    return object === null ? undefined : object[key]
  }
}

module.exports = property
