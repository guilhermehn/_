var nativeForEach = Array.prototype.forEach;

function forEach (fn, list) {
  if (typeof list !== 'undefined') {
    nativeForEach.call(list, fn.bind(list));
  }

  return forEach.bind(list, fn);
}

module.exports = forEach;
