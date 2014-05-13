'use strict';

var rivets = require('rivets');

Number.prototype.toFixedDown = function(digits) {
  var re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
      m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
};

rivets.formatters.miles = function(value) {
  return value.toFixedDown(1) + ' miles';
};

rivets.formatters.milesPerHour = function(value) {
  return value + ' miles/hour';
};

rivets.formatters.feet = function(value) {
  return value + ' feet';
};
