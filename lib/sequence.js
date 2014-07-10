var toArray = require('./toArray')
  , compose = require('./compose')

function sequence () {
  return compose.apply(this, toArray(arguments).reverse())
}

module.exports = sequence