var lib = {
    partial: require('./partial')
  , toArray: require('./toArray')

  // Operarions
  , sum: require('./sum')
  , subtract: require('./subtract')
  , addOne: require('./addOne')
  , subtractOne: require('./subtractOne')
  , double: require('./double')

  // Lists operations
  , map: require('./map')
  , reduce: require('./reduce')
  , forEach: require('./forEach')
}

module.exports = lib