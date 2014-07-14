var _ = require('../')
  , assert = require('assert')

describe('_', function () {
  it('should work', function () {
    var albums = [
      { artist: 'Exodus', name: 'Bonded By Blood' },
      { artist: 'Exodus', name: 'Shovel Headed Kill Machine' },
      { artist: 'Havok', name: 'Point Of No Return' },
      { artist: 'Havok', name: 'Unnatural Selection' },
      { artist: 'Slayer', name: 'Reign In Blood' },
      { artist: 'Slayer', name: 'God Hate Us All' }
    ]

    var bandAlbum = function (album) {
      return album.artist + ' - ' + album.name
    }

    assert.equal(bandAlbum(albums[0]), 'Exodus - Bonded By Blood')

    assert(_.map(bandAlbum, albums)[0], 'Exodus - Bonded By Blood')
  })

  describe('Examples', function () {
    it('Example #1', function () {
      var onlyNumbers = _.every(_.isNumber)

      assert(onlyNumbers([1, 2, 3]))

      var noNumbers = _.every(_.not(_.isNumber))

      assert(noNumbers([{}, undefined, null, 'abc', false]))
    })

    it('Example #2', function () {
      var findNumbers = _.filter(_.isNumber)

      assert.deepEqual(findNumbers([undefined, null, 1, {}, 2, false, 3]), [1, 2, 3])
    })
  })

  describe('README code tests', function () {
    it('should work property', function () {
      var
          // get all the even numbers from the list
          getEvens = _.filter(_.isEven)

          // double each number from the list
        , doubleNumbers = _.map(_.double)

          // sum all the numbers from the list
        , sum = _.partial(_.reduce(_.sum), _, 0)

        , numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


      assert.equal(sum(doubleNumbers(getEvens(numbers))), 40)

      // or do the right way
      var sumDoubleEvens = _.compose(sum, doubleNumbers, getEvens)

      assert.equal(sumDoubleEvens(numbers), 40)
    })
  })
})
