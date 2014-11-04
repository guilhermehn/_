var subCurry = require('./subCurry');
var toArray = require('./toArray');

function curry (fn, length) {
  length = length || fn.length;

  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(toArray(arguments));

      if (length - arguments.length > 0) {
        return curry(subCurry.apply(this, combined), length - arguments.length);
      }
      else {
        return subCurry.call(this, combined);
      }
    }
    else {
      return fn.apply(this, arguments);
    }
  };
}

module.exports = curry;
