// http://lodash.com/docs#range <3

function range (start, end, step) {
  start = +start || 0;
  step = typeof step == 'number' ? step : (+step || 1);

  if (end == null) {
    end = start
    start = 0
  }
  // use `Array(length)` so engines like Chakra and V8 avoid slower modes
  // http://youtu.be/XAqIpGU8ZZk#t=17m25s
  var index = -1
    , length = Math.max(0, Math.ceil((end - start) / (step || 1)))
    , result = Array(length)

  while (++index < length) {
    result[index] = start
    start += step
  }

  return result
}

module.exports = range
