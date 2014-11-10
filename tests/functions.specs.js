var _ = require('../');
var expect = require('expect.js');

describe('Functions', function () {
  describe('#isEven()', function () {
    it('should return true if number is even', function () {
      expect(_.isEven(2)).ok();
      expect(!_.isEven(3)).ok();
      expect(!_.isEven(2.456)).ok();
    });
  });

  describe('#isOdd()', function () {
    it('should return true if number is odd', function () {
      expect(_.isOdd(3)).ok();
      expect(!_.isOdd(2)).ok();
    });
  });

  describe('#isNumber()', function () {
    it('should return true if argument is a number', function () {
      expect(_.isNumber(1)).ok();
    });

    it('should return false if value is anything but a number', function () {
      var invalidValues = ['1', undefined, null, true, false, {}];
      expect(_.none(_.isNumber, invalidValues)).ok();
    });
  });

  describe('#isObject()', function () {
    it('should return true if value is a object', function () {
      expect(_.isObject({})).ok();
      expect(_.isObject([])).ok();
      expect(_.isObject('')).not.ok();
    });
  });

  describe('#isUndefined()', function () {
    it('should return true if value is undefined', function () {
      var obj = {};

      expect(_.isUndefined(undefined)).ok();
      expect(!_.isUndefined(1)).ok();
      expect(_.isUndefined()).ok();
      expect(!_.isUndefined(true)).ok();
      expect(!_.isUndefined('')).ok();
      expect(!_.isUndefined({})).ok();
      expect(_.isUndefined(void 0)).ok();
      expect(_.isUndefined(obj.foo)).ok();
    });
  });

  describe('#isArguments()', function () {
    it('should return true if value is arguments object', function () {
      function foo () {
        return _.isArguments(arguments);
      }

      function bar () {
        return _.isArguments(_.toArray(arguments));
      }

      function exposeArgs () {
        return arguments;
      }

      expect(foo(1, 2, 3)).ok();
      expect(!bar(1, 2, 3)).ok();

      expect(_.isArguments(exposeArgs(1, 2, 3))).ok();
    });

    it('should work with no arguments', function () {
      function foo () {
        return _.isArguments(arguments);
      }

      function bar () {
        return _.isArguments(_.toArray(arguments));
      }

      expect(foo()).ok();
      expect(!bar()).ok();
    });
  });

  describe('#isArray()', function () {
    it('should return true if the value is an Array', function () {
      expect(_.isArray([])).ok();
      expect(_.isArray('asdf')).not.ok();
      expect(_.isArray(true)).not.ok();
      expect(_.isArray(0)).not.ok();
      expect(_.isArray({})).not.ok();
    });
  });

  describe('#isEmpty()', function () {
    it('should return true if the array is empty', function () {
      expect(_.isEmpty([])).ok();
      expect(_.isEmpty(null)).ok();
      expect(!_.isEmpty([1])).ok();
      expect(!_.isEmpty([undefined])).ok();
    });

    it('should return true if the object is empty', function () {
      expect(_.isEmpty({})).ok();
      expect(!_.isEmpty({
        foo: 'bar'
      })).ok();

      expect(!_.isEmpty({
        foo: undefined
      })).ok();
    });

    it('should return true if the string is empty', function () {
      expect(_.isEmpty('')).ok();
      expect(!_.isEmpty('a')).ok();
    });

    it('should return true for objects only if it is a iterable', function () {
      expect(_.isEmpty(2)).ok();
      expect(_.isEmpty(/foo/)).ok();
    });
  });

  describe('#isString()', function () {
    it('should return true if value is a string', function () {
      expect(_.isString('')).ok();
      expect(!_.isString(undefined)).ok();
      expect(!_.isString([])).ok();
      expect(!_.isString(true)).ok();
      expect(!_.isString(1)).ok();
    });
  });

  describe('#isRegExp()', function () {
    it('should return true if the value is a regexp object', function () {
      expect(_.isRegExp(/abc/)).ok();
      expect(_.isRegExp('/abc/')).not.ok();
      expect(_.isRegExp()).not.ok();
    });
  });

  describe('#isNull()', function () {
    it('should return true if the value is `null`', function () {
      expect(_.isNull(null)).ok();
      expect(_.isNull(false)).not.ok();
      expect(_.isNull(true)).not.ok();
      expect(_.isNull()).not.ok();
    });
  });

  describe('#isNaN()', function () {
    it('should return true if the value is NaN', function () {
      expect(_.isNaN(NaN)).ok();
      expect(_.isNaN(1)).not.ok();
      expect(_.isNaN(true)).not.ok();
      expect(_.isNaN()).not.ok();
    });
  });

  describe('#isBoolean()', function () {
    it('should return true if the value is NaN', function () {
      expect(_.isBoolean(true)).ok();
      expect(_.isBoolean(false)).ok();
      expect(_.isBoolean()).not.ok();
      expect(_.isBoolean('true')).not.ok();
      expect(_.isBoolean('false')).not.ok();
      expect(_.isBoolean(1)).not.ok();
      expect(_.isBoolean(0)).not.ok();
    });
  });

  describe('#isDate()', function () {
    it('should return true if the value is a Date object', function () {
      expect(_.isDate(new Date())).ok();
      expect(_.isDate('Mon Nov 10 2014')).not.ok();
    });
  });

  describe('#partial()', function () {
    it('should return a function with partial applied arguments', function () {
      var partialSum = _.partial(_.sum, 1, undefined);

      expect(partialSum(1)).be(2);
    });

    it('should accept module global for skipping arguments', function () {
      var partialSum = _.partial(_.sum, _, 1);

      expect(partialSum(1)).be(2);
    });
  });

  describe('#curry()', function () {
    it('should make the function wait for all arguments to be passed before running', function () {
      var curried = _.curry(function (a, b, c) {
        return [a, b, c];
      });

      var oneTwo = curried(1, 2);

      expect(curried(1)(2)(3)).eql([1, 2, 3]);
      expect(oneTwo(3)).eql([1, 2, 3]);
    });
  });

  describe('#compose()', function () {
    it('should compose the functions into one', function () {
      var addAndDouble = _.compose(_.double, _.inc);
      var addAndDoubleLists = _.map(addAndDouble);

      expect(addAndDouble(1)).be(4);
      expect(addAndDouble(2)).be(6);
      expect(addAndDouble(3)).be(8);

      expect(addAndDoubleLists([1, 2, 3])).eql([4, 6, 8]);
    });
  });

  describe('#sequence()', function () {
    it('should run the given functions in sequence', function () {
      var addAndDouble = _.sequence(_.inc, _.double);
      var addAndDoubleLists = _.map(addAndDouble);

      expect(addAndDouble(1)).be(4);
      expect(addAndDouble(2)).be(6);
      expect(addAndDouble(3)).be(8);

      expect(addAndDoubleLists([1, 2, 3])).eql([4, 6, 8]);
    });
  });

  describe('#property()', function () {
    it('should return a getter function for the property specified', function () {
      var getFoo = _.property('foo');
      var obj1 = {
        foo: 'foo'
      };
      var obj2 = {
        foo: 'bar'
      };

      expect(getFoo(obj1)).be('foo');
      expect(getFoo(obj2)).be('bar');
    });

    it('should return undefined if the object does not contain the specified key', function () {
      var getFoo = _.property('foo');
      expect(getFoo({})).be(undefined);
    });
  });

  describe('#toArray()', function () {
    it('should convert to array', function () {
      var args = _.toArray(arguments);

      expect(!(arguments instanceof Array)).ok();
      expect(args instanceof Array).ok();
    });
  });

  describe('#range()', function () {
    it('should return a range of numbers', function () {
      expect(_.range(4)).eql([0, 1, 2, 3]);
    });

    it('should accept two arguments, `start` and `end`', function () {
      expect(_.range(1, 5)).eql([1, 2, 3, 4]);
    });

    it('should accept a `step` argument', function () {
      expect(_.range(2, -2, -1)).eql([2, 1, 0, -1]);

      expect(_.range(0, 20, 5)).eql([0, 5, 10, 15]);
    });

    it('should return a empty list if `start` is 0', function () {
      expect(_.range(0)).eql([]);
    });
  });

  describe('#keys()', function () {
    it('should return the keys from the object', function () {
      var foo = {
        foo: 'bar'
      };

      expect(_.keys(foo)).eql(['foo']);
    });

    it('should return a empty array if value is not a enumerable object', function () {
      expect(_.keys(1)).eql([]);
      expect(_.keys(undefined)).eql([]);
      expect(_.keys(null)).eql([]);
      expect(_.keys(function () {})).eql([]);
      expect(_.keys('lorem')).eql([]);
    });
  });

  describe('#concat()', function () {
    var a = [1, 2, 3];
    var b = [4, 5, 6];

    it('should concat two arrays into one', function () {
      expect(_.concat(a, b)).eql([1, 2, 3, 4, 5, 6]);
    });

    it('should not mutate the arguments', function () {
      var c = _.concat(a, b);

      expect(a).eql([1, 2, 3]);
      expect(b).eql([4, 5, 6]);
      expect(c).eql([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('#not()', function () {
    it('should return a function that negates the callback return', function () {
      function foo () {
        return false;
      }

      expect(_.not(foo)()).ok();

      var notNumber = _.not(_.isNumber);

      expect(notNumber({})).ok();
    });

    it('should evaluate and negate values', function () {
      expect(_.not(true) === false).ok();
    });
  });

  describe('#has()', function () {
    function Foo () {
      this.foo = 'bar';
    }

    it('should return true if the object contains the determined key', function () {
      var obj = {
        foo: 'bar'
      };

      expect(_.has('foo', obj)).ok();
      expect(_.has('foo', new Foo())).ok();
      expect(_.has('foo', {})).not.ok();
    });

    it('should return a function that checks for the key if not object is passed', function () {
      var hasFoo = _.has('foo');

      expect(hasFoo({
        foo: 'bar'
      })).ok();

      expect(hasFoo({})).not.ok();
      expect(hasFoo(new Foo())).ok();
    });
  });

  describe('#once()', function () {
    function addOne (n) {
      return n + 1;
    }

    it('should run only once', function () {
      var addOneOnce = _.once(addOne);

      expect(addOneOnce(2)).eql(3);
      expect(addOneOnce(4)).eql(3);
    });
  });

  describe('#truthy()', function () {
    it('should return if the object is truthy', function () {
      expect(_.truthy(true)).ok();
      expect(_.truthy(1)).ok();
      expect(_.truthy(0)).not.ok();
      expect(_.truthy(null)).not.ok();
      expect(_.truthy(false)).not.ok();
      expect(_.truthy()).not.ok();
      expect(_.truthy('')).not.ok();
    });
  });
});
