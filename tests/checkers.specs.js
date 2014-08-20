/*globals describe, it*/
var _ = require('../')
  , expect = require('expect.js')

describe('Checkers', function () {
  'use strict';

  describe('#isEven()', function () {
    it('should return true if number is even', function () {
      expect(_.isEven(2)).ok()
      expect(!_.isEven(3)).ok()
      expect(!_.isEven(2.456)).ok()
    })
  })

  describe('#isOdd()', function () {
    it('should return true if number is odd', function () {
      expect(_.isOdd(3)).ok()
      expect(!_.isOdd(2)).ok()
    })
  })

  describe('#isNumber()', function () {
    it('should return true if argument is a number', function () {
      expect(_.isNumber(1)).ok()
    })

    it('should return false if value is anything but a number', function () {
      var invalidValues = ['1', undefined, null, true, false, {}]
      expect(_.none(_.isNumber, invalidValues)).ok()
    })
  })

  describe('#isObject()', function () {
    it('should return true if value is a object', function () {
      expect(_.isObject({})).ok()
    })
  })

  describe('#isUndefined()', function () {
    it('should return true if value is undefined', function () {
      var obj = {}

      expect(_.isUndefined(undefined)).ok()
      expect(!_.isUndefined(1)).ok()
      expect(_.isUndefined()).ok()
      expect(!_.isUndefined(true)).ok()
      expect(!_.isUndefined('')).ok()
      expect(!_.isUndefined({})).ok()
      expect(_.isUndefined(void 0)).ok()
      expect(_.isUndefined(obj.foo)).ok()
    })
  })

  describe('#isArguments()', function () {
    it('should return true if value is arguments object', function () {
      function foo () {
        return _.isArguments(arguments)
      }

      function bar () {
        return _.isArguments(_.toArray(arguments))
      }

      expect(foo(1, 2, 3)).ok()
      expect(!bar(1, 2, 3)).ok()
    })

    it('should work with no arguments', function () {
      function foo () {
        return _.isArguments(arguments)
      }

      function bar () {
        return _.isArguments(_.toArray(arguments))
      }

      expect(foo()).ok()
      expect(!bar()).ok()
    })
  })

  describe('#isEmpty()', function () {
    it('should return true if the array is empty', function () {
      expect(_.isEmpty([])).ok()
      expect(_.isEmpty(null)).ok()
      expect(!_.isEmpty([1])).ok()
      expect(!_.isEmpty([undefined])).ok()
    })

    it('should return true if the object is empty', function () {
      expect(_.isEmpty({})).ok()
      expect(!_.isEmpty({ foo: 'bar' })).ok()
      expect(!_.isEmpty({ foo: undefined })).ok()
    })

    it('should return true if the string is empty', function () {
      expect(_.isEmpty('')).ok()
      expect(!_.isEmpty('a')).ok()
    })

    it('should return true for objects only if it is a iterable', function () {
      expect(_.isEmpty(2)).ok()
      expect(_.isEmpty(/foo/)).ok()
    })
  })

  describe('#isString()', function () {
    it('should return true if value is a string', function () {
      expect(_.isString('')).ok()
      expect(!_.isString(undefined)).ok()
      expect(!_.isString([])).ok()
      expect(!_.isString(true)).ok()
      expect(!_.isString(1)).ok()
    })
  })
})
