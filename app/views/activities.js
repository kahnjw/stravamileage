'use strict';

var Backbone = require('backbone');
var activitiesCollection = require('../collections/activities');
var activitiesTemplate = require('../templates/activities.rvt');
var _  = require('lodash');
var rivets = require('rivets');


var Activities = Backbone.View.extend({
  events: {
    'click .simple-button': 'refresh'
  },
  template: activitiesTemplate,

  initialize: function() {
    this.activities = activitiesCollection;
    this.activities.fetch();
  },

  render: function() {
    this.$el.html(this.template);

    this.rivet = rivets.bind(this.$el, {
      activities: this.activities,
      controller: this
    });
  },

  refresh: function() {
    var data = {
      data: {refresh: true}
    };

    this.activities.fetch(data)
      .success(_.bind(this.done, this))
      .fail(_.bind(this.done, this));

    this.$el.find('.simple-button i').addClass('spin');
  },

  done: function() {
    this.$el.find('.simple-button i').removeClass('spin');
  },

  clean: function() {
    this.rivet.unbind();
  }
});

module.exports = Activities;
