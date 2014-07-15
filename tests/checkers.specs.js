var _ = require('../')
  , assert = require('assert')

describe('Checkers', function () {
  describe('#isEven()', function () {
    it('should return true if number is even', function () {
      assert(_.isEven(2))
      assert(!_.isEven(3))
      assert(!_.isEven(2.456))
    })
  })

  describe('#isOdd()', function () {
    it('should return true if number is odd', function () {
      assert(_.isOdd(3))
      assert(!_.isOdd(2))
    })
  })

  describe('#isNumber()', function () {
    it('should return true if argument is a number', function () {
      assert(_.isNumber(1))
    })

    it('should return false if value is anything but a number', function () {
      var invalidValues = ['1', undefined, null, true, false, {}]
      assert(_.none(_.isNumber, invalidValues))
    })
  })

  describe('#isObject()', function () {
    it('should return true if value is a object', function () {
      assert(_.isObject({}))
    })
  })

  describe('#isUndefined()', function () {
    it('should return true if value is undefined', function () {
      var obj = {}

      assert(_.isUndefined(undefined))
      assert(!_.isUndefined(1))
      assert(_.isUndefined())
      assert(!_.isUndefined(true))
      assert(!_.isUndefined(''))
      assert(!_.isUndefined({}))
      assert(_.isUndefined(void 0))
      assert(_.isUndefined(obj.foo))
    })
  })

  describe('#isArguments()', function () {
    it('should return true if value is arguments object', function () {
      function foo (a, b, c) {
        return _.isArguments(arguments)
      }

      function bar (a, b, c) {
        return _.isArguments(_.toArray(arguments))
      }

      assert(foo(1, 2, 3))
      assert(!bar(1, 2, 3))
    })

    it('should work with no arguments', function () {
      function foo () {
        return _.isArguments(arguments)
      }

      function bar () {
        return _.isArguments(_.toArray(arguments))
      }

      assert(foo())
      assert(!bar())
    })
  })

  describe('#isEmpty()', function () {
    it('should return true if the array is empty', function () {
      assert(_.isEmpty([]))
      assert(!_.isEmpty([1]))
      assert(!_.isEmpty([undefined]))
    })

    it('should return true if the object is empty', function () {
      assert(_.isEmpty({}))
      assert(!_.isEmpty({ foo: 'bar' }))
      assert(!_.isEmpty({ foo: undefined }))
    })

    it('should return true if the string is empty', function () {
      assert(_.isEmpty(''))
      assert(!_.isEmpty('a'))
    })
  })

  describe('#isString()', function () {
    it('should return true if value is a string', function () {
      assert(_.isString(''))
      assert(!_.isString(undefined))
      assert(!_.isString([]))
      assert(!_.isString(true))
      assert(!_.isString(1))
    })
  })
})
