var _forEach = Array.prototype.forEach

function forEach (fn, list) {
  if (typeof list !== 'undefined') {
    _forEach.call(list, fn.bind(list))
  }

  return forEach.bind(list, fn)
}

module.exports = forEach