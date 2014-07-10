var _ = require('../')
  , assert = require('assert')

describe('_', function () {
  describe('#sum()', function () {
    it('should sum properly', function () {
      assert.equal(_.sum(1, 2), 3)
    })
  })

  describe('#addOne()', function () {
    it('should add one', function () {
      var a = 1
      assert.equal(a, 1)

      a = _.addOne(a)
      assert.equal(a, 2)
    })
  })

  describe('#subtract()', function () {
    it('should subtract numbers', function () {
      assert.equal(_.subtract(2, 1), 1)
    })
  })

  describe('#subtractOne()', function () {
    it('should subtract one', function () {
      assert.equal(_.subtractOne(5), 4)
      assert.equal(_.subtractOne(5.5), 4.5)
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

  describe('#map()', function () {
    var list, mapped

    beforeEach(function () {
      list = [1, 2, 3]
      mapped = _.map(_.double, list)
    })

    it('should map a list to a new list passed through a function', function () {
      assert.equal(mapped[0], 2)
    })

    it('should keep the original list intact', function () {
      assert.equal(mapped[0], 2)
      assert.equal(list[0], 1)
    })

    it('should return a map function if no list is passed', function () {
      var doubleList = _.map(_.double)
        , doubled = doubleList(list)

      assert.equal(doubled[0], 2)
    })
  })

  describe('#reduce()', function () {
    var list

    beforeEach(function () {
      list = [1, 2, 3]
    })

    it('should reduce the list to one value', function () {
      var total = _.reduce(_.sum, list, 0)
      assert.equal(total, 6)
    })

    it('should keep the list intact', function () {
      var total = _.reduce(_.sum, list, 0)
      assert.equal(total, 6)
      assert.equal(list[0], 1)
    })

    it('should return a partial applied function if no list is passed', function () {
      var sumReduce = _.reduce(_.sum)
        , sum = sumReduce(list, 0)
        , sum2 = sumReduce([2, 3, 4], 0)

      assert.equal(sum, 6)
      assert.equal(sum2, 9)
      assert.equal(list[0], 1)
    })
  })

  describe('#forEach()', function () {
    it('should run a function for every item on list', function () {
      var list = [1, 2, 3]
        , listx = []

      _.forEach(function (item, i, xs) {
        listx[listx.length] = item.toString()
      }, list)

      assert.deepEqual(listx, ['1', '2', '3'])
    })

    it('should patial apply the function when no list is passed', function () {
      var counter = 0
        , incCounter = _.forEach(inc)

      function inc () {
        counter += 1
      }

      incCounter([1, 2, 3, 4, 5])

      assert.equal(counter, 5)
    })
  })

  describe('#filter()', function () {
    it('should remove a item from the result if it return false from the function', function () {
      assert.deepEqual(_.filter(_.isEven, [1, 2, 3]), [2])
    })

    it('should return a partial applied function if no list is passed', function () {
      var getOdds = _.filter(_.isOdd)

      assert.deepEqual(getOdds([1, 2, 3]), [1, 3])
    })

    it('should not modify the original list', function () {
      var list = [1, 2, 3, 4]
        , getEvens = _.filter(_.isEven)

      getEvens(list)
      assert.deepEqual(list, [1, 2, 3, 4])
    })
  })

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
})