#fundash#

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

#### Attention: This Is Not A Lodash/Underscore Replacement
To use it with Lodash/Underscore, `require` it to another namespace

## API ##

- Lists
    - [map](#map)
    - [reduce](#reduce)
    - [forEach](#forEach)
    - [filter](#filter)
    - [some](#some)
    - [every](#every)
    - [pluck](#pluck)
    - [replace](#replace)
- Functions
    - [partial](#partial)
    - [curry](#curry)

### Lists

#### #map()

`_.map(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

**Example:**

    function increment (a) {
      return a + 1
    }

    var list = [1, 2, 3]

    _.map(increment, list) // [2, 3, 4]

    var incrementItems = _.map(increment)

    incrementItems(list) // [2, 3, 4]

***

#### #reduce()

`_.reduce(Function [, Array, initial])`

Arguments:
- `Function`: accepts four arguments: `accumulator`, `item`, `index` and `list`
- `Array`
- `initial`: *

**Example:**

    var list = [1, 2, 3]

    _.reduce(_.sum, list, 0) // 6

    var sumItems = _.map(sum)

    sumItems(list) // 6

***

#### #forEach()

`_.forEach(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

**Example:**

    var evens = []
      , odds = []
      , list = [1, 2, 3, 4, 5]

    _.forEach(function (item) {
      var type = _.isEven(item) ? evens : odds

      type.push(item)
    }, list)

    // evens == [2, 4]
    // odds  == [1, 3, 5]

    var log = _.forEach(console.log)

    log(list)
    // 1 0 [1, 2, 3, 4, 5]
    // 2 1 [1, 2, 3, 4, 5]
    // 3 2 [1, 2, 3, 4, 5]
    // 4 3 [1, 2, 3, 4, 5]
    // 5 4 [1, 2, 3, 4, 5]


***

#### #filter()

`_.filter(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

**Example:**

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

#### #some()

`_.some(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

**Example:**

    _.some(_.isEven, [1, 2, 3]) // true
    _.some(_.isEven, [3, 5, 7]) // false
    _.some(_.isOdd, [2, 3, 4])  // true

    var containsEvens = _.some(_.isEven)

    containsEvens([1, 2, 3]) // true

***

#### #every()

`_.every(Function [, Array])`

Arguments:
- `Function`: accepts three arguments: `item`, `index` and `list`
- `Array`

**Example:**

    _.every(_.isEven, [1, 2, 3]) // flase
    _.every(_.isOdd, [3, 5, 7])  // true

    var onlyEvens = _.every(_.isEven)

    onlyEvens([1, 2, 3]) // false

***

#### #pluck()

`_.pluck(String [, Array])`

Arguments:
- `String`: property to be retrieved from all the items of the list
- `Array`

**Example:**

    var collection = [
      { foo: 'foo' },
      { foo: 'bar' },
      { prop: 'erty' }
    ]

    _.pluck('foo', collection) // ['foo', 'bar', undefined]

    var getFoos = _.pluck('foo')

    getFoos(collection) // ['foo', 'bar', undefined]

***

#### #replace()

`_.replace(Array [, Array])`

Arguments:
- `Array`: list of indexes to get from second `Array` argument
- `Array`

**Example:**

    var list = [9, 8, 7, 6, 5]

    _.replace([0, 2, 4], list) // [9, 7, 5]

    var getFirstThreeItems = _.replace([0, 1, 2])

    getFirstThreeItems(list) // [9, 8, 7]

***

### Functions ###

#### #partial()

`_.partial(Function, Arg1 [, Arg2, ...])`

Arguments:
- `Function`: Function whose arguments will be applied
- `ArgN`: Arguement(s) to be applied to the function. Arguments can be skipped using `undefined` or `_` global

**Example:**

    var addOne = _.partial(_.sum, 1, _)
      , addTwo = _.partial(_.sum, 2, undefined)

    addOne(2) // 3
    addTwo(2) // 4

***

#### #curry()

`_.curry(Function [, argumentsSize])`

Arguments:
- `Function`: Function to be curryied
- `argumentsSize`: `int`: quantity of arguments that `Function` will receive. *Must be provided if `Function`'s arity is incorrect*

**Example:**

    var curry = _.curry(function (a, b, c) {
      return [a, b, c]
    })

    curry(1)
    curry(2)
    curry(3) // [1, 2, 3]

***

## TODO
- [ ] Publish to NPM
- [ ] Complete API docs
- [ ] Make wiki
- [ ] More functions (Yay!)