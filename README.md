#_#

Functional utils

```javascript
var
    // get all the even numbers from the list
    getEvens = _.filter(_.isEven)

    // double each number from the list
  , doubleNumbers = _.map(_.double)

    // sum all the numbers from the list
  , sum = _.partial(_.reduce(_.sum), _, 0)

  , numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

sum(
    doubleNumbers(
        getEvens(numbers))) // [4, 8, 12, 16]

// or do the right way
var sumDoubleEvens = _.compose(sum, doubleNumbers, getEvents)

sumDoubleEvens(numbers) // [4, 8, 12, 16]
```

### Attention: This Is Not A Lodash/Underscore Replacement ###
To use it with Lodash/Underscore, `require` it to another namespace

## API ##

### #map() ###

`_.map(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

#### Example: ###
    function increment (a) {
      return a + 1
    }

    var list = [1, 2, 3]

    _.map(increment, list) // [2, 3, 4]

    var incrementItems = _.map(increment)

    incrementItems(list) // [2, 3, 4]

***

### #reduce() ###

`_.reduce(Function [, Array, initial])`

Arguments:
- `Function`: accepts four arguments: `accumulator`, `item`, `index` and `list`
- `Array`
- `initial`: *

#### Example: ###
    var list = [1, 2, 3]

    _.reduce(_.sum, list, 0) // 6

    var sumItems = _.map(sum)

    sumItems(list) // 6

***

### #forEach() ###

`_.forEach(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

#### Example: ###
    var evens = []
      , odds = []
      , list = [1, 2, 3, 4, 5]

    _.forEach(function (item) {
      var type = _.isEven(item) ? evens : odds

      type.push(item)
    }, list)

    // evens == [2, 4]
    // odds  == [1, 3, 5]

***

### #filter() ###

`_.filter(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

#### Example: ###
    var list = [1, 2, 3, 4, 5]
      , evens
      , odds

    evens = _.filter(_.isEven, list)
    odds = _.filter(_.isOdd, list)

    // evens == [2, 4]
    // odds  == [1, 3, 5]

    var getEvens = _.filter(_.isEven)
      , getOdds = _.filter(_.isOdd)

    getEvens(list) // [2, 4]
    getOdds(list)  // [1, 3, 5]

***

### #some() ###

`_.some(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

#### Example: ###
    _.some(_.isEven, [1, 2, 3]) // true
    _.some(_.isEven, [3, 5, 7]) // false
    _.some(_.isOdd, [2, 3, 4])  // true

    var containsEvens = _.some(_.isEven)

    containsEvens([1, 2, 3]) // true

***
