var lib = {
    curry: require('./curry')
  , partial: require('./partial')
  , property: require('./property')
  , toArray: require('./toArray')
  , replace: require('./replace')
  , compose: require('./compose')
  , sequence: require('./sequence')
  , range: require('./range')

  // Operarions
  , sum: require('./sum')
  , subtract: require('./subtract')
  , multiply: require('./multiply')
  , divide: require('./divide')
  , inc: require('./inc')
  , dec: require('./dec')
  , double: require('./double')
  , sumAll: require('./sumAll')

  // Checkers
  , isEven: require('./isEven')
  , isOdd: require('./isOdd')
  , isNumber: require('./isNumber')

  // Lists operations
  , map: require('./map')
  , reduce: require('./reduce')
  , forEach: require('./forEach')
  , filter: require('./filter')
  , some: require('./some')
  , every: require('./every')
  , none: require('./none')
  , pluck: require('./pluck')
  , first: require('./first')
  , last: require('./last')
}

module.exports = lib
