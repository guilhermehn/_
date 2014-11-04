var toArray = require('./toArray');

function compose () {
  var fns = toArray(arguments);
  var length = fns.length;

  return function (result) {
    var i = length;

    while (--i >= 0) {
      result = fns[i].call(this, result);
    }

    return result;
  };
}

module.exports = compose;
