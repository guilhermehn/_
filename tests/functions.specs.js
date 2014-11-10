/*globals describe, it*/
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

      expect(foo(1, 2, 3)).ok();
      expect(!bar(1, 2, 3)).ok();
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
      expect(_.isRegExp(/abc/)).to.ok();
      expect(_.isRegExp('/abc/')).to.not.ok();
      expect(_.isRegExp()).to.not.ok();
    });
  });

  describe('#partial()', function () {
    it('should return a function with partial applied arguments', function () {
      var partialSum = _.partial(_.sum, 1, undefined);

      expect(partialSum(1)).to.be(2);
    });

    it('should accept module global for skipping arguments', function () {
      var partialSum = _.partial(_.sum, _, 1);

      expect(partialSum(1)).to.be(2);
    });
  });

  describe('#curry()', function () {
    it('should make the function wait for all arguments to be passed before running', function () {
      var curried = _.curry(function (a, b, c) {
        return [a, b, c];
      });

      var oneTwo = curried(1, 2);

      expect(curried(1)(2)(3)).to.eql([1, 2, 3]);
      expect(oneTwo(3)).to.eql([1, 2, 3]);
    });
  });

  describe('#compose()', function () {
    it('should compose the functions into one', function () {
      var addAndDouble = _.compose(_.double, _.inc);
      var addAndDoubleLists = _.map(addAndDouble);

      expect(addAndDouble(1)).to.be(4);
      expect(addAndDouble(2)).to.be(6);
      expect(addAndDouble(3)).to.be(8);

      expect(addAndDoubleLists([1, 2, 3])).to.eql([4, 6, 8]);
    });
  });

  describe('#sequence()', function () {
    it('should run the given functions in sequence', function () {
      var addAndDouble = _.sequence(_.inc, _.double);
      var addAndDoubleLists = _.map(addAndDouble);

      expect(addAndDouble(1)).to.be(4);
      expect(addAndDouble(2)).to.be(6);
      expect(addAndDouble(3)).to.be(8);

      expect(addAndDoubleLists([1, 2, 3])).to.eql([4, 6, 8]);
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

      expect(getFoo(obj1)).to.be('foo');
      expect(getFoo(obj2)).to.be('bar');
    });

    it('should return undefined if the object does not contain the specified key', function () {
      var getFoo = _.property('foo');
      expect(getFoo({})).to.be(undefined);
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
      expect(_.range(4)).to.eql([0, 1, 2, 3]);
    });

    it('should accept two arguments, `start` and `end`', function () {
      expect(_.range(1, 5)).to.eql([1, 2, 3, 4]);
    });

    it('should accept a `step` argument', function () {
      expect(_.range(2, -2, -1)).to.eql([2, 1, 0, -1]);

      expect(_.range(0, 20, 5)).to.eql([0, 5, 10, 15]);
    });

    it('should return a empty list if `start` is 0', function () {
      expect(_.range(0)).to.eql([]);
    });
  });

  describe('#keys()', function () {
    it('should return the keys from the object', function () {
      var foo = {
        foo: 'bar'
      };

      expect(_.keys(foo)).to.eql(['foo']);
    });

    it('should return a empty array if value is not a enumerable object', function () {
      expect(_.keys(1)).to.eql([]);
      expect(_.keys(undefined)).to.eql([]);
      expect(_.keys(null)).to.eql([]);
      expect(_.keys(function () {})).to.eql([]);
      expect(_.keys('lorem')).to.eql([]);
    });
  });

  describe('#concat()', function () {
    var a = [1, 2, 3];
    var b = [4, 5, 6];

    it('should concat two arrays into one', function () {
      expect(_.concat(a, b)).to.eql([1, 2, 3, 4, 5, 6]);
    });

    it('should not mutate the arguments', function () {
      var c = _.concat(a, b);

      expect(a).to.eql([1, 2, 3]);
      expect(b).to.eql([4, 5, 6]);
      expect(c).to.eql([1, 2, 3, 4, 5, 6]);
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

  describe('#once()', function () {
    function addOne (n) {
      return n + 1;
    }

    it('should run only once', function () {
      var addOneOnce = _.once(addOne);

      expect(addOneOnce(2)).to.eql(3);
      expect(addOneOnce(4)).to.eql(3);
    });
  });

  describe('#truthy()', function () {
    it('should return if the object is truthy', function () {
      expect(_.truthy(true)).to.ok();
      expect(_.truthy(1)).to.ok();
      expect(_.truthy(0)).to.not.ok();
      expect(_.truthy(null)).to.not.ok();
      expect(_.truthy(false)).to.not.ok();
      expect(_.truthy()).to.not.ok();
      expect(_.truthy('')).to.not.ok();
    });
  });
});
