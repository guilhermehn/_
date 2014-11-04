var filter = require('./filter');

function compact (xs) {
  return filter(function (x) {
    return !!x;
  }, xs);
}

module.exports = compact;
