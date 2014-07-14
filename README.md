#fundash#

Functional utils. *heavily inspired by [Lodash](http://lodash.com/).*

```javascript
var _ = require('fundash')

    // get all the even numbers from the list
    getEvens = _.filter(_.isEven)

    // double each number from the list
  , doubleNumbers = _.map(_.double)

    // sum all the numbers from the list
  , sum = _.partial(_.reduce(_.sum), _, 0)

  , numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

sum(
    doubleNumbers(
        getEvens(numbers))) // [4, 8, 12, 16] -> 40

// or do the right way
var sumDoubleEvens = _.compose(sum, doubleNumbers, getEvents)

sumDoubleEvens(numbers) // [4, 8, 12, 16] -> 40
```

## Installation ##
`npm install fundash`

#### Attention: This Is Not A Lodash/Underscore Replacement
To use it with Lodash/Underscore, `require` it to another namespace

## API ##

- Lists
    - [map](#map)
    - [reduce](#reduce)
    - [forEach](#foreach)
    - [filter](#filter)
    - [some](#some)
    - [every](#every)
    - [none](#none)
    - [pluck](#pluck)
    - [replace](#replace)
    - [first](#first)
    - [last](#last)
    - [indexOf](#indexof)
- Functions
    - [partial](#partial)
    - [curry](#curry)
    - [compose](#compose)
    - [sequence](#sequence)
    - [propery](#propery)
    - [toArray](#toArray)
    - [range](#range)
- Operations
    - [sum](#sum)
    - [subtract](#subtract)
    - [multiply](#multiply)
    - [divide](#divide)
    - [sumAll](#sumall)
    - [inc](#inc)
    - [dec](#dec)
    - [double](#double)
- Checkers
    - [isEven](#iseven)
    - [isOdd](#isodd)
    - [isNumber](#isnumber)
    - [isObject](#isobject)
    - [isUndefined](#isundefined)
    - [isArguments](#isarguments)
    - [isEmpty](#isempty)
    - [isString](#isstring)

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

#### #compose()

`_.compose(Function, Function [, Function, ...])`

Arguments:
- `FunctionN`: Compose a function from given functions from right to left

**Example:**

    var sumEvens = _.compose(_.sumAll, _.filter(_.isEven))

    sumEvens([1, 2, 3, 4, 5, 6, 7, 8, 9]) // 20

***

#### #sequence()

`_.sequence(Function, Function [, Function, ...])`

Arguments:
- `FunctionN`: Function to be executed in sequence

**Example:**

    var sumOdds = _.sequence(_.filter(_.isOdd), _.sumAll)

    sumOdds([1, 2, 3, 4, 5, 6, 7, 8, 9]) // 25

***

#### #propery()

`_.propery(String)`

Arguments:
- `String`: Property to be get

**Example:**

    var getFoo = _.property('foo')

    getFoo({ foo: 'bar' }) // bar

***

#### #toArray()

`_.toArray(Arguments)`

Arguments:
- `Arguments`: Cast `arguments` object to array

**Example:**

    function foo (a, b, c) {
      var args = _.toArray(arguments)

      // args == [a, b, c]
    }

***

#### #indexOf()

`_.indexOf(value, Array)`

Arguments:
- `value`: *: value to be searched by in the `Array`
- `Array`

**Example:**
    _.indexOf(2, [1, 2, 3]) // 1

    var foo = { bar: 'lorem' }
    _.indexOf(foo, [foo]) // 0

    var firstFooFrom = _.indexOf(foo)
    firstFooFrom([1, 2, foo, 3, 4]) // 2

***

#### #range()

`_.range(start, end, step)`

Arguments:
- `start`: `Number`: starting value
- `end`: `Number`: not including end value
- `step`: `Number`

**Example:**
    _.range(3) // [0, 1, 2]

    _.range(1, 4) // [1, 2, 3]

    _.range(10, 0, -1) // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    _.range(1, 4, 0) // [1, 1, 1]

***

### Operations

#### #sum()

`_.sum(Number, Number)`

Arguments:
- `Number`s: Numbers to be summed

**Example:**

    _.sum(1, 2) // 3

***

#### #subtract()

`_.subtract(Number, Number)`

Arguments:
- `Number`s: Numbers to be subtracted

**Example:**

    _.subtract(2, 1) // 1

***

#### #multiply()

`_.multiply(Number, Number)`

Arguments:
- `Number`s: Numbers to be multiplied

**Example:**

    _.multiply(2, 2) // 4

***

#### #divide()

`_.divide(Number, Number)`

Arguments:
- `Number`s: Numbers to be divided

**Example:**

    _.divide(4, 2) // 2

***

#### #sumAll()

`_.sumAll(Array)`

Arguments:
- `Array`: Sum all numbers in the list. Ignores anything that is not a number

**Example:**

    _.sumAll([1, 2, 3]) // 6

***

#### #inc()

`_.inc(Number)`

Arguments:
- `Number`: Number to be increased by one

**Example:**

    _.inc(1) // 2

    var incList = _.map(_.inc)

    incList([0, 1, 2]) // [1, 2, 3]
    incList([1, 2, 3]) // [2, 3, 4]

***

#### #dec()

`_.dec(Number)`

Arguments:
- `Number`: Number to be decreased by one

**Example:**

    _.dec(1) // 2

    var decList = _.map(_.dec)

    decList([1, 2, 3]) // [0, 1, 2]

***

#### #double()

`_.double(Number)`

Arguments:
- `Number`: Number to be multiplied by 2

**Example:**

    _.double(2) // 4

    var doubleList = _.map(_.double)

    doubleList([1, 2, 3]) // [2, 4, 6]

***

## TODO
- [x] Publish to NPM
- [ ] Complete API docs
- [ ] Make wiki
- [ ] More functions (Yay!)
