var reduce = require('./reduce');
var concat = require('./concat');
var toArray = require('./toArray');

function concatAll () {
  return reduce(concat, toArray(arguments), []);
}

module.exports = concatAll;
