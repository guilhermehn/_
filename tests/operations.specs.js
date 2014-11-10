var _ = require('../');
var expect = require('expect.js');

describe('Operations', function () {
  describe('#sum()', function () {
    it('should sum properly', function () {
      expect(_.sum(1, 2)).be(3);
    });
  });

  describe('#sumAll()', function () {
    it('should sum all the items from the list', function () {
      expect(_.sumAll([1, 2, 3])).be(6);
      expect(_.sumAll([4, 5, 6])).be(15);
    });

    it('should skip non numbers', function () {
      expect(_.sumAll(['1', 1, undefined, 2, 3])).be(6);
    });
  });

  describe('#inc()', function () {
    it('should add one', function () {
      var a = 1;
      expect(a).be(1);

      a = _.inc(a);
      expect(a).be(2);
    });
  });

  describe('#subtract()', function () {
    it('should subtract numbers', function () {
      expect(_.subtract(2, 1)).be(1);
    });
  });

  describe('#dec()', function () {
    it('should subtract one', function () {
      expect(_.dec(5)).be(4);
      expect(_.dec(5.5)).be(4.5);
    });
  });

  describe('#multiply()', function () {
    it('should multiply two numbers', function () {
      expect(_.multiply(2, 3)).be(6);
    });
  });

  describe('#divide()', function () {
    it('should divide', function () {
      expect(_.divide(4, 2)).be(2);
      expect(_.divide(5, 2)).be(2.5);
    });
  });

  describe('#double()', function () {
    it('should return the double of the number', function () {
      expect(_.double(2)).be(4);
      expect(_.double(5)).be(10);
      expect(_.double(2.5)).be(5);
      expect(_.double(3.3)).be(6.6);
    });
  });

  describe('#max()', function () {
    it('should return the largest number from the list', function () {
      expect(_.max([1, 2])).be(2);
      expect(_.max([-1, 0])).be(0);
    });

    it('should return -Infinity if the list is empty', function () {
      expect(_.max([])).be(-Infinity);
    });
  });

  describe('#min()', function () {
    it('should return the smallest number from the list', function () {
      expect(_.min([1, 2])).be(1);
      expect(_.min([-1, 0])).be(-1);
    });

    it('should return Infinity if the list is empty', function () {
      expect(_.min([])).be(Infinity);
    });
  });

  describe('#square()', function () {
    it('should return the number squared', function () {
      expect(_.square(2)).be(4);
      expect(_.square(-2)).be(4);
      expect(_.square(0)).be(0);
      expect(_.square(12)).be(144);
    });
  });
});
