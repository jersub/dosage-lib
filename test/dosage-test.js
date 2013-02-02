var dosage;

if (typeof require != "undefined") {
  var buster = require('buster');
  dosage = require('../src/dosage');
} else {
  dosage = new Dosage();
}


buster.testCase("Partitioning", {

  'reaches a leaf': function () {
    var parts = dosage._partition(1000, []);

    buster.assert.equals(parts, []);
  },

  'gets an OK at a given level': function () {
    var parts = dosage._partition(1000, [100]);

    buster.assert.equals(parts, [{
      level: 100,
      factor: 10,
      remainder: 0,
    }]);
  },

  'fails at a given level': function () {
    var parts = dosage._partition(50, [100]);

    buster.assert.equals(parts, []);
  },

  'succeeds with multi-levels': function () {
    var parts = dosage._partition(650, [100, 50]);

    buster.assert.equals(parts, [
      {
        level: 100,
        factor: 6,
        remainder: 50,
      },
      {
        level: 50,
        factor: 1,
        remainder: 0,
      },
    ]);
  },

  'succeeds while skipping an intermediate level': function () {
    var parts = dosage._partition(650, [100, 75, 50]);

    buster.assert.equals(parts, [
      {
        level: 100,
        factor: 6,
        remainder: 50,
      },
      {
        level: 50,
        factor: 1,
        remainder: 0,
      },
    ]);
  },

  'succeeds thanks to backtracking': function () {
    var parts = dosage._partition(650, [125, 100, 50]);

    buster.assert.equals(parts, [
      {
        level: 125,
        factor: 4,
        remainder: 150,
      },
      {
        level: 100,
        factor: 1,
        remainder: 50,
      },
      {
        level: 50,
        factor: 1,
        remainder: 0,
      },
    ]);
  },

  'succeeds with an edge-case backtracking': function () {
    var parts = dosage._partition(150, [125, 100, 50]);

    buster.assert.equals(parts, [
      {
        level: 100,
        factor: 1,
        remainder: 50,
      },
      {
        level: 50,
        factor: 1,
        remainder: 0,
      },
    ]);
  },
});

