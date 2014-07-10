var slice = Array.prototype.slice

function toArray (args) {
  return slice.call(arguments)
}

module.exports = toArray