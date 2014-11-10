(function () {
  // Main object
  var _ = {};

  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

  var argsClass = '[object Arguments]';
  var arrayClass = '[object Array]';
  var boolClass = '[object Boolean]';
  var dateClass = '[object Date]';
  var errorClass = '[object Error]';
  var numberClass = '[object Number]';
  var objectClass = '[object Object]';
  var regexpClass = '[object RegExp]';
  var stringClass = '[object String]';

  var objectTypes = {
    boolean: false,
    function: true,
    object: true,
    number: false,
    string: false,
    undefined: false
  };

  // Slice shortcut
  var slice = [].slice;

  var objProto = Object.prototype;

  var hasOwnProperty = Object.hasOwnProperty;

  // Native methods
  var nativeForEach = Array.prototype.forEach;
  var nativeFilter = Array.prototype.filter;
  var nativeReduce = Array.prototype.reduce;
  var nativeMap = Array.prototype.map;
  var nativeEvery = Array.prototype.every;
  var nativeSome = Array.prototype.some;
  var nativeIsArray = Array.isArray;
  var toString = objProto.toString;

  function toArray (args) {
    return slice.call(args);
  }

  /**
   * Return true if the `value` is undefined
   * @param  {*}  value
   * @return {Boolean}
   * @example
   *
   * var foo = 'bar';
   * isUndefined(foo);
   * // => false
   *
   * isUndefined();
   * // => true
   */
  function isUndefined (value) {
    return typeof value === 'undefined';
  }

  /**
   * Return true if the `value` is Number
   * @param  {*}  value
   * @return {Boolean}
   * @example
   *
   * isNumber(1);
   * // => true
   *
   * isNumber(NaN);
   * // => true
   *
   * isNumber('1');
   * // => false
   */
  function isNumber (value) {
    var type = typeof value;
    return type === 'number' || (value && type === 'object' && toString.call(value) === numberClass) || false;
  }

  function isFunction (value) {
    return typeof value === 'function';
  }

  function isObject (value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.io/#x8
    // and avoid a V8 bug
    // http://code.google.com/p/v8/issues/detail?id=2291
    return !!(value && objectTypes[typeof value]);
  }

  function isArguments (value) {
    var length = (value && typeof value === 'object') ? value.length : undefined;
    return ((isNumber(length) && length > -1 && length < MAX_SAFE_INTEGER) && toString.call(value) === argsClass) || false;
  }

  function isEmpty (value) {
    var result = true;

    if (!value) {
      return result;
    }

    var className = toString.call(value);
    var length = value.length;

    if ((className === arrayClass || className === stringClass || (isArguments(value))) || (className === objectClass && typeof length === 'number' && isFunction(value.splice))) {
      return !length;
    }

    if (isObject(value)) {
      return keys(value).length === 0;
    }

    return result;
  }

  function isString (value) {
    var type = typeof value;
    return type === 'string' || (value && type === 'object' && toString.call(value) === stringClass) || false;
  }

  function isRegExp (value) {
    return (isObject(value) && toString.call(value) === regexpClass) || false;
  }

  function isEven (a) {
    return a % 2 === 0;
  }

  function isOdd (a) {
    return (a % 2) > 0;
  }

  function isNull (value) {
    return value === null;
  }

  function isNaN (value) {
    return isNumber(value) && value !== +value;
  }

  function isBoolean (value) {
    return (value === true || value === false || value && typeof value === 'object' && toString.call(value) === boolClass) || false;
  }

  function isDate (value) {
    return (value && typeof value === 'object' && toString.call(value) === dateClass) || false;
  }

  function once (fn, context) {
    var result;

    return function () {
      if (fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }

      return result;
    };
  }

  function subCurry (fn) {
    var args = slice.call(arguments, 1);
    return function () {
      return fn.apply(this, args.concat(toArray(arguments)));
    };
  }

  function curry (fn, length) {
    length = length || fn.length;

    return function () {
      if (arguments.length < length) {
        var combined = [fn].concat(toArray(arguments));

        if (length - arguments.length > 0) {
          return curry(subCurry.apply(this, combined), length - arguments.length);
        }
        else {
          return subCurry.call(this, combined);
        }
      }
      else {
        return fn.apply(this, arguments);
      }
    };
  }

  function partial (fn) {
    var args = slice.call(arguments, 1);
    var length = args.length;
    var self = this;

    return function () {
      var arg = 0;
      var l = arguments.length;
      var i = -1;

      for (; ++i < length && arg < l;) {
        if (args[i] === self || args[i] === undefined) {
          args[i] = arguments[arg++];
        }
      }

      return fn.apply(this, args);
    };
  }

  function compose () {
    var fns = toArray(arguments);
    var length = fns.length;

    return function (result) {
      var i = length;

      while (--i >= 0) {
        result = fns[i].call(this, result);
      }

      return result;
    };
  }

  function sequence () {
    return compose.apply(null, toArray(arguments).reverse());
  }

  function indexOf (value, list) {
    if (!isUndefined(list)) {
      return list.indexOf(value);
    }

    return indexOf.bind(null, value);
  }

  function not (fn) {
    if (isFunction(fn)) {
      return function () {
        return !fn.apply(this, arguments);
      };
    }

    return !fn;
  }

  function has (key, object) {
    if (isUndefined(object)) {
      return has.bind(null, key);
    }

    return object ? hasOwnProperty.call(object, key) : false;
  }

  function range (start, end, step) {
    start = +start || 0;
    step = isNumber(step) ? step : (+step || 1);

    if (!isNumber(end) && !end) {
      end = start;
      start = 0;
    }
    // use `Array(length)` so engines like Chakra and V8 avoid slower modes
    // http://youtu.be/XAqIpGU8ZZk#t=17m25s
    var index = -1;
    var length = Math.max(0, Math.ceil((end - start) / (step || 1)));
    var result = new Array(length);

    while (++index < length) {
      result[index] = start;
      start += step;
    }

    return result;
  }

  function keys (value) {
    if (!isObject(value)) {
      return [];
    }

    return Object.keys(value);
  }

  function truthy (x) {
    return !!x;
  }

  function property (key) {
    return function (object) {
      return object === null ? undefined : object[key];
    };
  }

  function forEach (fn, list) {
    if (!isUndefined(list)) {
      nativeForEach.call(list, fn.bind(list));
    }

    return forEach.bind(list, fn);
  }

  /**
   * Iterates over a `list` and returns all the elements that the `iterator` return true.
   * If no `list` is passed, it returns a function that runs the `iterator` for each
   * item for any `list` passed to it.
   * @param {Function} iterator The function to run for each element
   * @param {Array} list The list of elements to be filtered
   * @return {Array} Returns the filtered list
   * @example
   *
   * var evens = _.filter(_.isEven, [1, 2, 3, 4]);
   * // => [2, 4]
   *
   * var getEvens = _.filter(_.isEven);
   * // => [function]
   *
   * getEvens([1, 2, 3, 4]);
   * // => [2, 4]
   */
  function filter (iterator, list) {
    if (!isUndefined(list)) {
      return nativeFilter.call(list, iterator);
    }

    return filter.bind(null, iterator);
  }

  /**
   * Reduces the value from a `list` into only one value based on the return of the `iterator` iterator
   * @param  {Function} iterator
   * @param  {Array}   list
   * @param  {*}   start
   * @return {*}
   * @example
   *
   * var total = _.reduce(_.sum, [1, 2, 3, 4, 5], 0);
   * // => 15
   *
   * var items [
   *   { foo: 1 },
   *   { foo: 2 },
   *   { foo: 3 }
   * ];
   * var foos = _.reduce(function (accumulator, item, index, list) {
   *   return accumulator.push(item.foo);
   * }, items, []);
   * // => [1, 2, 3]
   */
  function reduce (iterator, list, start) {
    if (!isUndefined(list)) {
      return nativeReduce.call(list, iterator, start);
    }

    return function (list, start) {
      return nativeReduce.call(list, iterator, start);
    };
  }

  function reduceRight (iterator, list, start) {
    if (isUndefined(list)) {
      return reduceRight.bind(null, iterator);
    }

    list = nativeIsArray(list) && list.reverse() || list;
    return reduce(iterator, list, start);
  }

  /**
   * Iterates over a `list` and return a new array based on the result of the `iterator` function
   * If no `list` is passed it returns a function that runs the `iterator` over the elements of any list passed to it
   * @param  {Function} iterator
   * @param  {Array}   list
   * @return {Array}
   * @example
   *
   * var doubles = _.map(function (item, index, list) {
   *   return item * 2;
   * }, [1, 2, 3]);
   * // => [2, 4, 6]
   *
   * var toDouble = _.map(function (item, index, list) {
   *   return item * 2;
   * });
   *
   * toDouble([1, 2, 3]);
   * // => [2, 4, 6]
   */
  function map (iterator, list) {
    if (!isUndefined(list)) {
      return nativeMap.call(list, iterator, list);
    }

    return map.bind(null, iterator);
  }

  function every (fn, list) {
    if (!isUndefined(list)) {
      return nativeEvery.call(list, fn);
    }

    return every.bind(null, fn);
  }

  function some (fn, list) {
    if (!isUndefined(list)) {
      return nativeSome.call(list, fn);
    }

    return some.bind(null, fn);
  }

  function none (fn, list) {
    if (!isUndefined(list)) {
      return !some(fn, list);
    }

    return none.bind(null, fn);
  }

  function first (list) {
    return list[0];
  }

  function last (list) {
    return list[list.length - 1];
  }

  function rest (xs) {
    return xs.slice(1);
  }

  /**
   * Returns a new array from the result of concating the two arrays
   * @param  {Array} a An array
   * @param  {Array} b Another array
   * @return {Array}
   * @example
   *
   * _.concat([1, 2], [3, 4]);
   * // => [1, 2, 3, 4]
   */
  function concat (a, b) {
    return a.concat(b);
  }

  function concatAll () {
    return reduce(concat, toArray(arguments), []);
  }

  function compact (list) {
    return filter(truthy, list);
  }

  function replace (indexes, list) {
    if (isUndefined(list)) {
      return replace.bind(null, indexes);
    }

    return map(function (i) {
      return list[i];
    }, indexes);
  }

  function pluck (key, list) {
    var getKey = property(key);
    var mapKey = map(getKey);

    if (typeof list !== 'undefined') {
      return mapKey(list);
    }

    return mapKey;
  }

  function square (x) {
    return x * x;
  }

  function minWrapper (a, b) {
    return Math.min(a, b);
  }

  function min (list) {
    return reduce(minWrapper, list, Infinity);
  }

  function maxWrapper (a, b) {
    return Math.max(a, b);
  }

  function max (list) {
    return reduce(maxWrapper, list, -Infinity);
  }

  function sum (a, b) {
    return a + b;
  }

  function subtract (a, b) {
    return a - b;
  }

  function multiply (a, b) {
    return a * b;
  }

  function divide (a, b) {
    return a / b;
  }

  function sumIfIsNumber (a, b) {
    return isNumber(b) ? a + b : a;
  }

  function sumAll (list) {
    return reduce(sumIfIsNumber, list, 0);
  }

  // Functions
  _.toArray = toArray;
  _.isUndefined = isUndefined;
  _.isNumber = isNumber;
  _.isFunction = isFunction;
  _.isObject = isObject;
  _.isArguments = isArguments;
  _.isArray = nativeIsArray;
  _.isEmpty = isEmpty;
  _.isString = isString;
  _.isRegExp = isRegExp;
  _.isEven = isEven;
  _.isOdd = isOdd;
  _.isNull = isNull;
  _.isNaN = isNaN;
  _.isBoolean = isBoolean;
  _.isDate = isDate;
  _.once = once;
  _.property = property;
  _.curry = curry;
  _.partial = partial;
  _.compose = compose;
  _.sequence = sequence;
  _.indexOf = indexOf;
  _.not = not;
  _.has = has;
  _.range = range;
  _.keys = keys;
  _.truthy = truthy;

  // Lists
  _.forEach = forEach;
  _.filter = filter;
  _.reduce = reduce;
  _.reduceRight = reduceRight;
  _.map = map;
  _.every = every;
  _.some = some;
  _.none = none;
  _.first = first;
  _.last = last;
  _.rest = rest;
  _.concat = concat;
  _.concatAll = concatAll;
  _.compact = compact;
  _.replace = replace;
  _.pluck = pluck;

  // Operations
  _.square = square;
  _.min = min;
  _.max = max;
  _.sum = sum;
  _.multiply = multiply;
  _.divide = divide;
  _.subtract = subtract;
  _.sumAll = sumAll;
  _.double = multiply.bind(null, 2);
  _.inc = sum.bind(null, 1);
  _.dec = sum.bind(null, -1);

  module.exports = _;
})();
