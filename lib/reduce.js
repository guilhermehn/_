var nativeReduce = Array.prototype.reduce;

function reduce (fn, xs, start) {
  if (typeof xs !== 'undefined') {
    return nativeReduce.call(xs, fn, start);
  }

  return function (xs, start) {
    return nativeReduce.call(xs, fn, start);
  };
}

module.exports = reduce;
