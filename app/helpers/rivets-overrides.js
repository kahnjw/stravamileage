'use strict';

var rivets = require('rivets');
var Backbone = require('backbone');
var _ = require('lodash');

var fucked = function(object, keypath, callback) {
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

rivets.adapters['.'].subscribe = function(object, keypath, callback) {

  _.bind(fucked, this)(object, keypath, callback);

  if(keypath && object[keypath] instanceof Backbone.Collection) {
    object[keypath].on('add remove', function() {
      callback(object[keypath].models);
    });
    return;
  }

  if(keypath && object[keypath] instanceof Backbone.Model) {
    object[keypath].on('add remove change model', function() {
      callback(object[keypath].models);
    });
    return;
  }

  object.on('change:' + keypath, function(model, value) {
    callback(value);
  });
};

rivets.adapters['.'].read = function(object, keypath) {

  if(object instanceof Backbone.Collection) {
    return object.models;
  }

  if(keypath && object[keypath] instanceof Backbone.Collection) {
    return object[keypath].models;
  }

  if(!keypath) {
    return object;
  }

  if (object && object.get) {
    return object.get(keypath);
  }

  return object[keypath];
};

rivets.adapters['.'].publish = function(obj, keypath, value) {
  // Stub
};

rivets.adapters['.'].unsubscribe = function(object, keypath, callback) {

};

rivets.formatters.miles = function(value) {
  return value + ' miles';
};

rivets.formatters.milesPerHour = function(value) {
  return value + ' miles/hour';
};

rivets.formatters.feet = function(value) {
  return value + ' feet';
};
