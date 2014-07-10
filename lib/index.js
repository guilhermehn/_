var lib = {
    partial: require('./partial')
  , toArray: require('./toArray')

  // Operarions
  , sum: require('./sum')
  , subtract: require('./subtract')
  , addOne: require('./addOne')
  , subtractOne: require('./subtractOne')
  , double: require('./double')

  // Checkers
  , isEven: require('./isEven')
  , isOdd: require('./isOdd')

  // Lists operations
  , map: require('./map')
  , reduce: require('./reduce')
  , forEach: require('./forEach')
  , filter: require('./filter')
  , some: require('./some')
  , every: require('./every')
}

module.exports = lib