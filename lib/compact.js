var filter = require('./filter');
var truty = require('./truty');

function compact (xs) {
  return filter(truty, xs);
}

module.exports = compact;
