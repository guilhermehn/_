var property = require('./property');
var map = require('./map');

function pluck (key, list) {
  var getKey = property(key);
  var mapKey = map(getKey);

  if (typeof list !== 'undefined') {
    return mapKey(list);
  }

  return mapKey;
}

module.exports = pluck;
