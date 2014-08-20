var slice = [].slice

function toArray (args) {
  'use strict';

  return slice.call(args)
}

module.exports = toArray
