var _reduce = Array.ptotoype.reduce

function reduce (fn, xs, start) {
  if (typeof xs !== 'undefined') {
    return reduce.call(this, fn, xs, start)
  }

  return reduce.bind(this, fn)
}