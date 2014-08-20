/*globals describe, it*/
var _ = require('../')
  , expect = require('expect.js')

describe('Functions', function () {
  'use strict';

  describe('#partial()', function () {
    it('should return a function with partial applied arguments', function () {
      var partialSum = _.partial(_.sum, 1, undefined)

      expect(partialSum(1)).to.be(2)
    })

    it('should accept module global for skipping arguments', function () {
      var partialSum = _.partial(_.sum, _, 1)

      expect(partialSum(1)).to.be(2)
    })
  })

  describe('#curry()', function () {
    it('should make the function wait for all arguments to be passed before running', function () {
      var curried = _.curry(function (a, b, c) { return [a, b, c] })
        , oneTwo = curried(1, 2)

      expect(curried(1)(2)(3)).to.eql([1, 2, 3])
      expect(oneTwo(3)).to.eql([1, 2, 3])
    })
  })

  describe('#compose()', function () {
    it('should compose the functions into one', function () {
      var addAndDouble = _.compose(_.double, _.inc)
        , addAndDoubleLists = _.map(addAndDouble)

      expect(addAndDouble(1)).to.be(4)
      expect(addAndDouble(2)).to.be(6)
      expect(addAndDouble(3)).to.be(8)

      expect(addAndDoubleLists([1, 2, 3])).to.eql([4, 6, 8])
    })
  })

  describe('#sequence()', function () {
    it('should run the given functions in sequence', function () {
      var addAndDouble = _.sequence(_.inc, _.double)
        , addAndDoubleLists = _.map(addAndDouble)

      expect(addAndDouble(1)).to.be(4)
      expect(addAndDouble(2)).to.be(6)
      expect(addAndDouble(3)).to.be(8)

      expect(addAndDoubleLists([1, 2, 3])).to.eql([4, 6, 8])
    })
  })

  describe('#property()', function () {
    it('should return a getter function for the property specified', function () {
      var getFoo = _.property('foo')
        , obj1 = { foo: 'foo' }
        , obj2 = { foo: 'bar' }

      expect(getFoo(obj1)).to.be('foo')
      expect(getFoo(obj2)).to.be('bar')
    })

    it('should return undefined if the object does not contain the specified key', function () {
      var getFoo = _.property('foo')
      expect(getFoo({})).to.be(undefined)
    })
  })

  describe('#toArray()', function () {
    it('should convert to array', function () {
      var args = _.toArray(arguments)

      expect(!(arguments instanceof Array)).ok()
      expect(args instanceof Array).ok()
    })
  })

  describe('#range()', function () {
    it('should return a range of numbers', function () {
      expect(_.range(4)).to.eql([0, 1, 2, 3])
    })

    it('should accept two arguments, `start` and `end`', function () {
      expect(_.range(1, 5)).to.eql([1, 2, 3, 4])
    })

    it('should accept a `step` argument', function () {
      expect(_.range(2, -2, -1)).to.eql([2, 1, 0, -1])

      expect(_.range(0, 20, 5)).to.eql([0, 5, 10, 15])
    })

    it('should return a empty list if `start` is 0', function () {
      expect(_.range(0)).to.eql([])
    })
  })

  describe('#keys()', function () {
    it('should return the keys from the object', function () {
      expect(_.keys({ foo: 'bar' })).to.eql(['foo'])
    })

    it('should return a empty array if value is not a enumerable object', function () {
      expect(_.keys(1)).to.eql([])
      expect(_.keys(undefined)).to.eql([])
      expect(_.keys(null)).to.eql([])
      expect(_.keys(function () {})).to.eql([])
      expect(_.keys('lorem')).to.eql([])
    })
  })

  describe('#concat()', function () {
    var a = [1, 2, 3]
      , b = [4, 5, 6]

    it('should concat two arrays into one', function () {
      expect(_.concat(a, b)).to.eql([1, 2, 3, 4, 5, 6])
    })

    it('should not mutate the arguments', function () {
      var c = _.concat(a, b)

      expect(a).to.eql([1, 2, 3])
      expect(b).to.eql([4, 5, 6])
      expect(c).to.eql([1 ,2, 3, 4, 5, 6])
    })
  })

  describe('#not()', function () {
    it('should return a function that negates the callback return', function () {
      function foo () {
        return false
      }

      expect(_.not(foo)()).ok()

      var notNumber = _.not(_.isNumber)

      expect(notNumber({})).ok()
    })

    it('should evaluate and negate values', function () {
      expect(_.not(true) === false).ok()
    })
  })

  describe('#once()', function () {
    function addOne (n) {
      return n + 1
    }

    it('should run only once', function () {
      var addOneOnce = _.once(addOne)

      expect(addOneOnce(2)).to.eql(3)
      expect(addOneOnce(4)).to.eql(3)
    })
  })
})
