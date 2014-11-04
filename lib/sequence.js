var toArray = require('./toArray');
var compose = require('./compose');

function sequence () {
  return compose.apply(null, toArray(arguments).reverse());
}

module.exports = sequence;
