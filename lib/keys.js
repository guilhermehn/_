var isObject = require('./isObject')

function keys (obj) {
  if (!isObject(obj)) {
    return []
  }

  return Object.keys(obj)
}

module.exports = keys
