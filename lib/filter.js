var nativeFilter = Array.prototype.filter;

function filter (fn, list) {
  if (typeof list !== 'undefined') {
    return nativeFilter.call(list, fn);
  }

  return filter.bind(null, fn);
}

module.exports = filter;
