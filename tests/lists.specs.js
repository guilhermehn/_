var _ = require('../')
  , expect = require('expect.js')

describe('Lists', function () {
  describe('#map()', function () {
    var list, mapped

    beforeEach(function () {
      list = [1, 2, 3]
      mapped = _.map(_.double, list)
    })

    it('should map a list to a new list passed through a function', function () {
      expect(mapped[0]).to.be(2)
    })

    it('should keep the original list intact', function () {
      expect(mapped[0]).to.be(2)
      expect(list[0]).to.be(1)
    })

    it('should return a map function if no list is passed', function () {
      var doubleList = _.map(_.double)
        , doubled = doubleList(list)

      expect(doubled[0]).to.be(2)
    })
  })

  describe('#reduce()', function () {
    var list

    beforeEach(function () {
      list = [1, 2, 3]
    })

    it('should reduce the list to one value', function () {
      var total = _.reduce(_.sum, list, 0)
      expect(total).to.be(6)
    })

    it('should keep the list intact', function () {
      var total = _.reduce(_.sum, list, 0)
      expect(total).to.be(6)
      expect(list[0]).to.be(1)
    })

    it('should return a partial applied function if no list is passed', function () {
      var sumReduce = _.reduce(_.sum)
        , sum = sumReduce(list, 0)
        , sum2 = sumReduce([2, 3, 4], 0)

      expect(sum).to.be(6)
      expect(sum2).to.be(9)
      expect(list[0]).to.be(1)
    })
  })

  describe('#forEach()', function () {
    it('should run a function for every item on list', function () {
      var list = [1, 2, 3]
        , listx = []

      _.forEach(function (item, i, xs) {
        listx[listx.length] = item.toString()
      }, list)

      expect(listx).to.eql(['1', '2', '3'])
    })

    it('should patial apply the function when no list is passed', function () {
      var counter = 0
        , incCounter = _.forEach(inc)

      function inc () {
        counter += 1
      }

      incCounter([1, 2, 3, 4, 5])

      expect(counter).to.be(5)
    })
  })

  describe('#filter()', function () {
    it('should remove a item from the result if it return false from the function', function () {
      expect(_.filter(_.isEven, [1, 2, 3])).to.eql([2])
    })

    it('should return a partial applied function if no list is passed', function () {
      var getOdds = _.filter(_.isOdd)

      expect(getOdds([1, 2, 3])).to.eql([1, 3])
    })

    it('should not modify the original list', function () {
      var list = [1, 2, 3, 4]
        , getEvens = _.filter(_.isEven)

      getEvens(list)
      expect(list).to.eql([1, 2, 3, 4])
    })
  })

  describe('#some()', function () {
    it('should return true if any the callback returns true', function () {
      var list = [1, 2, 3]

      expect(_.some(_.isEven, list)).ok()
    })

    it('should return undefined if no callback returns true', function () {
      expect(_.some(_.isEven, [1, 3, 5, 7, 9])).to.not.ok()
    })

    it('should not modify the original list', function () {
      var list = [1, 2, 3]

      expect(_.some(_.isEven, list)).ok()
      expect(list).to.eql([1, 2, 3])
    })
  })

  describe('#every()', function () {
    it('should return true if every callback execution returns true', function () {
      var list = [1, 2, 3]

      expect(_.every(function (item) {
        return item > 0
      })).ok()
    })

    it('should not modify the original list', function () {
      var list = [1, 2, 3]

      expect(_.every(function (item) {
        return item > 0
      })).ok()

      expect(list).to.eql([1, 2, 3])
    })

    it('should return a partial applied function if no list is passed', function () {
      var allEven = _.every(_.isEven)

      expect(allEven([1, 2])).to.not.ok()
    })
  })

  describe('#none()', function () {
    it('should return true if none of the callbacks return true', function () {
      expect(_.none(_.isEven, [1, 3, 5])).ok()
    })
  })

  describe('#pluck()', function () {
    var objs = [
        { foo: 'foo' }
      , { foo: 'bar' }
    ]

    it('should get the respective key from every object of the list', function () {
      expect(_.pluck('foo', objs)).to.eql(['foo', 'bar'])
    })

    it('should return "undefined" if the object does not contain the key', function () {
      objs.push({ bar: 'foo' })

      var foos = _.pluck('foo', objs)

      expect(foos[2]).to.be(undefined)
    })

    it('should return a partial applied function if no list is passed', function () {
      var getFoos = _.pluck('foo')

      expect(getFoos(objs)).to.eql(['foo', 'bar', undefined])
    })
  })

  describe('#replace()', function () {
    it('should take the items from the corresponding indexes', function () {
      var list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      expect(_.replace([0, 2, 4], list)).to.eql([1, 3, 5])
    })

    it('should return undefined when index is out of bounds', function () {
      var list = [1, 2, 3]

      expect(_.replace([0, 4], list)).to.eql([1, undefined])
    })
  })

  describe('#first()', function () {
    it('should return the first item from the list', function () {
      expect(_.first([1, 2, 3])).to.be(1)
    })

    it('should return undefined if the list is empty', function () {
      expect(_.first([])).to.be(undefined)
    })

    it('should not return the reference for the value', function () {
      var list = [1, 2, 3]
        , first = _.first(list)

      first += 1

      expect(first).to.be(2)
      expect(list[0]).to.be(1)
    })
  })

  describe('#last()', function () {
    it('should return the last item from the list', function () {
      expect(_.last([1, 2, 3]), 3)
    })

    it('should return undefined if the list is empty', function () {
      expect(_.last([]), undefined)
    })
  })

  describe('#indexOf()', function () {
    it('should return the index of the first occurence of the value in the list', function () {
      expect(_.indexOf(2, [1, 2, 3, 2])).to.be(1)

      var obj = {}
      expect(_.indexOf(obj, [obj])).to.be(0)

      var firstObj = _.indexOf(obj)
      expect(firstObj([1, obj, 2])).to.be(1)
    })

    it('should return -1 if the list does not contain the value', function () {
      expect(_.indexOf(4, [1, 2, 3])).to.be(-1)
    })
  })

  describe('#concatAll()', function () {
    it('should concat all arrays from the list', function () {
      var a = [1, 2, 3]
        , b = [4, 5, 6]

      expect(_.concatAll(a, b)).to.eql([1 ,2, 3, 4, 5, 6])
      expect(_.concatAll([1], [2], [3])).to.eql([1 ,2, 3])
    })
  })

  describe('#compact()', function () {
    it('should return all non-falsy values from the list', function () {
      expect(_.compact([1, 0, '', false, null, 2, 3, undefined, NaN])).to.eql([1, 2, 3])
    })
  })
})
