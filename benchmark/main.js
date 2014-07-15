var Benchmark = require('benchmark')
  , _ = require('../')

var suite = new Benchmark.Suite;
var list = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// add tests
suite.add('_.sumAll', function() {
  var sum = _.sumAll(list)
})
.add('while (n = l.shift())', function() {
  var sum = 0
    , l = list.slice()
    , n

  while (n = l.shift()) {
    sum += n
  }
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });
