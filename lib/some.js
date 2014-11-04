var nativeSome = Array.prototype.some;

function some (fn, xs) {
  if (typeof xs !== 'undefined') {
    return nativeSome.call(xs, fn);
  }

  return some.bind(null, fn);
}

module.exports = some;
