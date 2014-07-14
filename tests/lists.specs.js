var _ = require('../')
  , assert = require('assert')

describe('Lists', function () {
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

  describe('#some()', function () {
    it('should return true if any the callback returns true', function () {
      var list = [1, 2, 3]

      assert(_.some(_.isEven, list))
    })

    it('should return undefined if no callback returns true', function () {
      assert.equal(_.some(_.isEven, [1, 3, 5, 7, 9]), false)
    })

    it('should not modify the original list', function () {
      var list = [1, 2, 3]

      assert(_.some(_.isEven, list))
      assert.deepEqual(list, [1, 2, 3])
    })
  })

  describe('#every()', function () {
    it('should return true if every callback execution returns true', function () {
      var list = [1, 2, 3]

      assert(_.every(function (item) {
        return item > 0
      }))
    })

    it('should not modify the original list', function () {
      var list = [1, 2, 3]

      assert(_.every(function (item) {
        return item > 0
      }))

      assert.deepEqual(list, [1, 2, 3])
    })

    it('should return a partial applied function if no list is passed', function () {
      var allEven = _.every(_.isEven)

      assert(allEven([1, 2]) === false)
    })
  })

  describe('#none()', function () {
    it('should return true if none of the callbacks return true', function () {
      assert(_.none(_.isEven, [1, 3, 5]))
    })
  })

  describe('#pluck()', function () {
    var objs = [
      {
        foo: 'foo'
      },
      {
        foo: 'bar'
      }
    ]

    it('should get the respective key from every object of the list', function () {
      assert.deepEqual(_.pluck('foo', objs), ['foo', 'bar'])
    })

    it('should return "undefined" if the object does not contain the key', function () {
      objs.push({ bar: 'foo' })

      var foos = _.pluck('foo', objs)

      assert.equal(foos[2], undefined)
    })

    it('should return a partial applied function if no list is passed', function () {
      var getFoos = _.pluck('foo')

      assert.deepEqual(getFoos(objs), ['foo', 'bar', undefined])
    })
  })

  describe('#replace()', function () {
    it('should take the items from the corresponding indexes', function () {
      var list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      assert.deepEqual(_.replace([0, 2, 4], list), [1, 3, 5])
    })

    it('should return undefined when index is out of bounds', function () {
      var list = [1, 2, 3]

      assert.deepEqual(_.replace([0, 4], list), [1, undefined])
    })
  })

  describe('#first()', function () {
    it('should return the first item from the list', function () {
      assert.equal(_.first([1, 2, 3]), 1)
    })

    it('should return undefined if the list is empty', function () {
      assert.equal(_.first([]), undefined)
    })

    it('should not return the reference for the value', function () {
      var list = [1, 2, 3]
        , first = _.first(list)

      first += 1

      assert.equal(first, 2)
      assert.equal(list[0], 1)
    })
  })

  describe('#last()', function () {
    it('should return the last item from the list', function () {
      assert.equal(_.last([1, 2, 3]), 3)
    })

    it('should return undefined if the list is empty', function () {
      assert.equal(_.last([]), undefined)
    })
  })

  describe('#indexOf()', function () {
    it('should return the index of the first occurence of the value in the list', function () {
      assert.equal(_.indexOf(2, [1, 2, 3, 2]), 1)

      var obj = {}
      assert.equal(_.indexOf(obj, [obj]), 0)

      var firstObj = _.indexOf(obj)
      assert.equal(firstObj([1, obj, 2]), 1)
    })

    it('should return -1 if the list does not contain the value', function () {
      assert.equal(_.indexOf(4, [1, 2, 3]), -1)
    })
  })
})