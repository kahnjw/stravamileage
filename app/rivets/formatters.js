'use strict';

var rivets = require('rivets');

rivets.formatters.miles = function(value) {
  return value + ' miles';
};

rivets.formatters.milesPerHour = function(value) {
  return value + ' miles/hour';
};

rivets.formatters.feet = function(value) {
  return value + ' feet';
};
