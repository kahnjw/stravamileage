'use strict';

var Backbone = require('backbone');
var Activity = require('../models/activity');

var Activities = Backbone.Collection.extend({
  url: 'api/v1/activities/',
  comparator: function(item) {
    return item.get('id');
  },
  model: Activity
});

module.exports = new Activities();
