var _ = require('../')
  , assert = require('assert')

describe('Functions', function () {
  describe('#partial()', function () {
    it('should return a function with partial applied arguments', function () {
      var partialSum = _.partial(_.sum, 1, undefined)

      assert.equal(partialSum(1), 2)
    })

    it('should accept module global for skipping arguments', function () {
      var partialSum = _.partial(_.sum, _, 1)

      assert.equal(partialSum(1), 2)
    })
  })

  describe('#curry()', function () {
    it('should make the function wait for all arguments to be passed before running', function () {
      var curried = _.curry(function (a, b, c) { return [a, b, c] })
        , oneTwo = curried(1, 2)

      assert.deepEqual(curried(1)(2)(3), [1, 2, 3])
      assert.deepEqual(oneTwo(3), [1, 2, 3])
    })
  })

  describe('#compose()', function () {
    it('should compose the functions into one', function () {
      var addAndDouble = _.compose(_.double, _.inc)
        , addAndDoubleLists = _.map(addAndDouble)

      assert.equal(addAndDouble(1), 4)
      assert.equal(addAndDouble(2), 6)
      assert.equal(addAndDouble(3), 8)

      assert.deepEqual(addAndDoubleLists([1, 2, 3]), [4, 6, 8])
    })
  })

  describe('#sequence()', function () {
    it('should run the given functions in sequence', function () {
      var addAndDouble = _.sequence(_.inc, _.double)
        , addAndDoubleLists = _.map(addAndDouble)

      assert.equal(addAndDouble(1), 4)
      assert.equal(addAndDouble(2), 6)
      assert.equal(addAndDouble(3), 8)

      assert.deepEqual(addAndDoubleLists([1, 2, 3]), [4, 6, 8])
    })
  })

  describe('#property()', function () {
    it('should return a getter function for the property specified', function () {
      var getFoo = _.property('foo')
        , obj1 = { foo: 'foo' }
        , obj2 = { foo: 'bar' }

      assert.equal(getFoo(obj1), 'foo')
      assert.equal(getFoo(obj2), 'bar')
    })

    it('should return undefined if the object does not contain the specified key', function () {
      var getFoo = _.property('foo')
      assert.equal(getFoo({}), undefined)
    })
  })

  describe('#toArray()', function () {
    it('should convert to array', function () {
      var args = _.toArray(arguments)

      assert(!(arguments instanceof Array))
      assert(args instanceof Array)
    })
  })

  describe('#range()', function () {
    it('should return a range of numbers', function () {
      assert.deepEqual(_.range(4), [0, 1, 2, 3])
    })

    it('should accept two arguments, `start` and `end`', function () {
      assert.deepEqual(_.range(1, 5), [1, 2, 3, 4])
    })

    it('should accept a `step` argument', function () {
      assert.deepEqual(_.range(2, -2, -1), [2, 1, 0, -1])

      assert.deepEqual(_.range(0, 20, 5), [0, 5, 10, 15])
    })

    it('should return a empty list if `start` is 0', function () {
      assert.deepEqual(_.range(0), [])
    })
  })

  describe('#keys()', function () {
    it('should return the keys from the object', function () {
      assert.deepEqual(_.keys({ foo: 'bar' }), ['foo'])
    })

    it('should return a empty array if value is not a enumerable object', function () {
      assert.deepEqual(_.keys(1), [])
      assert.deepEqual(_.keys(undefined), [])
      assert.deepEqual(_.keys(null), [])
      assert.deepEqual(_.keys(function () {}), [])
      assert.deepEqual(_.keys('lorem'), [])
    })
  })

  describe('#concat()', function () {
    var a = [1, 2, 3]
      , b = [4, 5, 6]

    it('should concat two arrays into one', function () {
      assert.deepEqual(_.concat(a, b), [1, 2, 3, 4, 5, 6])
    })

    it('should not mutate the arguments', function () {
      var c = _.concat(a, b)

      assert.deepEqual(a, [1, 2, 3])
      assert.deepEqual(b, [4, 5, 6])
      assert.deepEqual(c, [1 ,2, 3, 4, 5, 6])
    })

    it('should ignore non-array values', function () {
      assert.deepEqual(_.concat(undefined, [1]), [1])
    })

    it('should work with #reduce()', function () {
      var c = [a, b]

      var concatArrays = _.reduce(_.concat)

      assert.deepEqual(concatArrays(c), [1, 2, 3, 4, 5, 6])
    })
  })

  describe('#not()', function () {
    it('should return a function that negates the callback return', function () {
      function foo () {
        return false
      }

      assert(_.not(foo)())

      var notNumber = _.not(_.isNumber)

      assert(notNumber({}))
    })

    it('should evaluate and negate values', function () {
      assert(_.not(true) === false)
    })
  })
})