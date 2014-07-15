var lib = {
    VERSION: '0.1.0'

  // Functions
  , curry: require('./curry')
  , partial: require('./partial')
  , property: require('./property')
  , toArray: require('./toArray')
  , replace: require('./replace')
  , compose: require('./compose')
  , sequence: require('./sequence')
  , range: require('./range')
  , keys: require('./keys')
  , concat: require('./concat')
  , not: require('./not')

  // Operarions
  , sum: require('./sum')
  , subtract: require('./subtract')
  , multiply: require('./multiply')
  , divide: require('./divide')
  , inc: require('./inc')
  , dec: require('./dec')
  , double: require('./double')
  , sumAll: require('./sumAll')
  , max: require('./max')
  , min: require('./min')

  // Checkers
  , isEven: require('./isEven')
  , isOdd: require('./isOdd')
  , isNumber: require('./isNumber')
  , isObject: require('./isObject')
  , isString: require('./isString')
  , isUndefined: require('./isUndefined')
  , isArguments: require('./isArguments')
  , isEmpty: require('./isEmpty')

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
  , indexOf: require('./indexOf')
  , concatAll: require('./concatAll')
}

module.exports = lib
