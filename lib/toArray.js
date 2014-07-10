var slice = [].slice

function toArray (args) {
  return slice.call(args)
}

module.exports = toArray