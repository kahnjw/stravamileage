'use strict';

var rivets = require('rivets');
var Backbone = require('backbone');
var _ = require('lodash');
var subscribeHelper = require('./subscribe-helper');


var dotAdapter = rivets.adapters['.'];

dotAdapter.subscribe = function(object, keypath, callback) {

  _.bind(subscribeHelper, this)(object, keypath, callback);

  if(keypath && object[keypath] instanceof Backbone.Collection) {
    object[keypath].on('add remove', function() {
      callback(object[keypath].models);
    });
    return;
  }

  if(keypath && object[keypath] instanceof Backbone.Model) {
    object[keypath].on('add remove change model', function() {
      callback(object[keypath]);
    });
    return;
  }

  if(object.on) {
    object.on('change:' + keypath, function(model, value) {
      callback(value);
    });
    return;
  }
  console.log(keypath + ' . subscribe no-op');
};

dotAdapter.unsubscribe = function(object, keypath, callback) {

};

dotAdapter.read = function(object, keypath) {

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

dotAdapter.publish = function(object, keypath, value) {
  // Set a backbone attribute
  object.set(keypath, value);
};

rivets.adapters['>'] = {};

var funcAdapter = rivets.adapters['>'];

funcAdapter.subscribe = function(object, keypath, callback) {
  console.log(keypath + ' > subscribe no-op');
};

funcAdapter.read = function(object, keypath) {
  // Because > is used for function calls, we must bind the call to the object
  return _.bind(object[keypath], object);
};

funcAdapter.publish = function(object, keypath, value) {
  object[keypath] = value;
};

funcAdapter.unsubscribe = function(object, keypath, callback) {

};
