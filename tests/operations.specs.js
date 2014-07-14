var _ = require('../')
  , assert = require('assert')

describe('Operations', function () {
  describe('#sum()', function () {
    it('should sum properly', function () {
      assert.equal(_.sum(1, 2), 3)
    })
  })

  describe('#sumAll()', function () {
    it('should sum all the items from the list', function () {
      assert.equal(_.sumAll([1, 2, 3]), 6)
    })

    it('should skip non numbers', function () {
      assert.equal(_.sumAll(['1', 1, undefined, 2, 3]), 6)
    })
  })

  describe('#inc()', function () {
    it('should add one', function () {
      var a = 1
      assert.equal(a, 1)

      a = _.inc(a)
      assert.equal(a, 2)
    })
  })

  describe('#subtract()', function () {
    it('should subtract numbers', function () {
      assert.equal(_.subtract(2, 1), 1)
    })
  })

  describe('#dec()', function () {
    it('should subtract one', function () {
      assert.equal(_.dec(5), 4)
      assert.equal(_.dec(5.5), 4.5)
    })
  })

  describe('#multiply()', function () {
    it('should multiply two numbers', function () {
      assert.equal(_.multiply(2, 3), 6)
    })
  })

  describe('#divide()', function () {
    it('should divide', function () {
      assert.equal(_.divide(4, 2), 2)
      assert.equal(_.divide(5, 2), 2.5)
    })
  })

  describe('#double()', function () {
    it('should return the double of the number', function () {
      assert.equal(_.double(2), 4)
      assert.equal(_.double(5), 10)
      assert.equal(_.double(2.5), 5)
      assert.equal(_.double(3.3), 6.6)
    })
  })
})