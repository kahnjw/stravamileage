'use strict';

var Backbone = require('backbone');
var ActivitiesCollection = require('../collections/activities');
var activitiesTemplate = require('../templates/activities.rvt');
var _  = require('lodash');
var rivets = require('rivets');


var Activities = Backbone.View.extend({
  events: {
    'click .simple-button': 'refresh'
  },
  template: activitiesTemplate,

  initialize: function() {
    this.activities = new ActivitiesCollection();
    this.activities.fetch();
  },

  render: function() {
    this.$el.html(this.template);

    rivets.bind(this.$el, {
      activities: this.activities,
      controller: this
    });
  },

  refresh: function() {
    var data = {
      data: {refresh: true}
    };
    var callDone = _.bind(this.done, this);

    this.activities.fetch(data)
      .success(callDone)
      .fail(callDone);

    this.$el.find('.simple-button i').addClass('spin');
  },

  done: function() {
    this.$el.find('.simple-button i').removeClass('spin');
  }
});

module.exports = Activities;
