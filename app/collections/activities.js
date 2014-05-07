'use strict';

var Backbone = require('backbone');

var Activities = Backbone.Collection.extend({
  url: 'api/v1/activities/'
});

module.exports = Activities;
