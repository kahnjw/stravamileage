'use strict';

var _ = require('lodash');

var subscribeHelper = function(object, keypath, callback) {
  var callbacks = this.weakReference(object).callbacks;
  var value = object[keypath];

  var get = function() {
    return value;
  };

  var set = function(newValue) {
    var _i, _len, _ref1;
    if (newValue !== value) {
      value = newValue;
      _ref1 = callbacks[keypath];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        callback = _ref1[_i];
        callback();
      }
      return this.observeMutations(newValue, object[this.id], keypath);
    }
  };

  if (callbacks[keypath]) {
    callbacks[keypath] = [];

    Object.defineProperty(object, keypath, {
      enumerable: true,
      get: get,
      set: _.bind(set, this)
    });
  }
};

module.exports = subscribeHelper;
