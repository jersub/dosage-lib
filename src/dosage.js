/**
 * @module Dosage
 * @author Jérémy Subtil <jeremy.subtil@gmail.com>
 */

"use strict";

/**
 * Object for converting volumes in milliliters to fractions of liters.
 * @constructor
 * @param {array} [levels=[]] The dosage levels.
 * @property {array} levels   - The dosage levels.
 */
var Dosage = function(levels) {
  this.levels = levels || [];
};

/**
 * Converts the given volume into fractions of liters.
 * @param {number} volume The volume to convert.
 * @returns {array}       Array of fractions of liters.
 */
Dosage.prototype.convert = function(volume) {
  return this._partition(volume, this.levels);
};

/**
 * Recursive method partitioning the given volume into fractions on liters
 * enumerated by the given dosage levels.
 * @param {number} volume The volume to partition.
 * @param {array} levels  The dosage levels.
 * @returns {array}       Array of fractions of liters.
 */
Dosage.prototype._partition = function(volume, levels) {
  // leaf
  if (levels.length === 0) {
    return [];
  }

  var sublevels = levels.slice(1, levels.length);

  var part = {level: levels[0]};
  part.factor = Math.floor(volume / part.level);
  part.remainder = volume - part.factor * part.level;

  var parts = this._partition(part.remainder, sublevels);

  // adds only useful parts
  if (part.factor > 0) {
    parts.unshift(part);
  }

  // partition OK
  if (parts.length === 0 || parts[parts.length-1].remainder === 0) {
    return parts;
  }

  // partitioning failed, next try with backtracking
  return this._backtrack(volume, parts, sublevels);
};

/**
 * Backtracking method easing the partitioning in case of failure.
 * @param {number} volume The volume to partition.
 * @param {array} parts   The last found parts.
 * @param {array} levels  The dosage levels.
 * @returns {array}       Array of fractions of liters.
 */
Dosage.prototype._backtrack = function(volume, parts, levels) {
  var part = parts[parts.length-1];

  if (part.factor > 1) {  
    part.factor = part.factor - 1;
    volume = part.remainder = volume - part.factor * part.level;
  } else {
    parts.pop();
  }

  return parts.concat(this._partition(volume, levels));
};


// node.js export
if (typeof require != "undefined") {
  module.exports = new Dosage();
}
