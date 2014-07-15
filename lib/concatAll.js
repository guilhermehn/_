var partial = require('./partial')
  , reduce = require('./reduce')
  , concat = require('./concat')
  , concatAll = partial(reduce(concat), undefined, [])

module.exports = concatAll
