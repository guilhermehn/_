var lib = {
    curry: require('./curry')
  , partial: require('./partial')
  , property: require('./property')
  , toArray: require('./toArray')
  , replace: require('./replace')

  // Operarions
  , sum: require('./sum')
  , subtract: require('./subtract')
  , multiply: require('./multiply')
  , divide: require('./divide')
  , addOne: require('./addOne')
  , subtractOne: require('./subtractOne')
  , double: require('./double')

  // Checkers
  , isEven: require('./isEven')
  , isOdd: require('./isOdd')

  // Lists operations
  , compose: require('./compose')
  , sequence: require('./sequence')
  , map: require('./map')
  , reduce: require('./reduce')
  , forEach: require('./forEach')
  , filter: require('./filter')
  , some: require('./some')
  , every: require('./every')
}

module.exports = lib