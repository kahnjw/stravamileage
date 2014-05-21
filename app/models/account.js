'use strict';

var Backbone = require('backbone');
var activities = require('../collections/activities');
var _ = require('lodash');

var Account = Backbone.Model.extend({
  initialize: function() {
    this.activities = activities;
    this.set('totalDistance', 0);

    this.activities.on('add remove', this.calculateTotalDistance, this);
  },

  calculateTotalDistance: function() {
    var distance = 0;
    _.each(this.activities.models, function(activity) {
      distance += activity.get('distance');
    });

    this.set('totalDistance', distance);
  },

  url: 'api/v1/strava/me/'
});

module.exports = Account;
