var expect = require('expect.js');
var _ = require('../');

describe('_.filter() use cases:', function () {
  function isMajor (person) {
    return person.age > 18;
  }

  var filterStrings = _.filter(_.isString);
  var onlyMajorAge = _.filter(isMajor);
  var persons = [
    {
      name: 'John Doe',
      age: 20
    },
    {
      name: 'Another',
      age: 17
    },
    {
      name: 'Children',
      age: 5
    },
    {
      name: 'Kid',
      age: 10
    },
    {
      name: 'Elder',
      age: 50
    }
  ];

  describe('filterStrings', function () {
    var list = [1, '1', '2', 2, '3', 3];
    var list2 = [1, 2, 3];
    it('should filter strings from the list', function () {
      expect(filterStrings(list)).to.eql([1, 2, 3]);
      expect(filterStrings(list2)).to.eql([]);
    });

    it('should work with empty lists', function () {
      expect(filterStrings([])).to.eql([]);
    });
  });

  describe('onlyMajorAge', function () {
    it('should filter collection for persons of age over 18', function () {
      expect(onlyMajorAge(persons).length).to.be(2);
    });

    it('should work with empty collection', function () {
      expect(onlyMajorAge([])).to.eql([]);
    });

    it('should work even if person dont have age prop', function () {
      var persons = [
        {
          name: 'John Doe',
          age: 20
        },
        {
          name: 'New'
        }
      ];

      expect(onlyMajorAge(persons)).to.eql([persons[0]]);
    });
  });
});

describe('_.curry() use cases', function () {
  function foo (a, b, c) {
    return [a, b, c];
  }

  it('should work with async functions', function (done) {
    var bar = _.curry(foo, 3);
    var timeout = _.curry(setTimeout, _, 100);

    timeout(function () {
      bar = bar(1);

      timeout(function () {
        bar = bar(2);

        timeout(function () {
          expect(bar(3)).to.eql([1, 2, 3]);
          done();
        });
      });
    });
  });
});
