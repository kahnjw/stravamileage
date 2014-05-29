'use strict';

var Backbone = require('backbone');
var createEditGearTemplate = require('../templates/add-gear.rvt');
var gearCollection = require('../collections/gear-collection');
var activitiesCollection = require('../collections/activities');
var Activity = require('../models/activity');
var errorHandler = require('../helpers/error-handler');
var rivets = require('rivets');
var _ = require('lodash');


var AddGearToActivity = Backbone.View.extend({
  template: createEditGearTemplate,

  initialize: function() {
    this.activitiesCollection = activitiesCollection;
    this.gearCollection = gearCollection;

    this.activitiesCollection.fetch()
      .fail(errorHandler);

    this.gearCollection.fetch()
      .fail(errorHandler);
  },

  render: function() {
    this.gearCollection.on('add', this.checkOverlap, this);
    this.$el.html(this.template);

    this.rivet = rivets.bind(this.$el, {
      activity: this.activity,
      gear: gearCollection,
      controller: this
    });

    this.checkOverlap();
  },

  checkOverlap: function() {
    var currentActivityGearUrls = this.activity.get('gear');
    var gearUrl;

    _.each(this.gearCollection.models, function(gearItem) {

      gearUrl = gearItem.get('url');

      if(_.contains(currentActivityGearUrls, gearUrl)) {
        gearItem.set('added', true);
      }

    });
  },

  getActivity: function(activityId) {
    this.activity = this.activitiesCollection.get(activityId);

    if(!this.activity) {
      this.activity = new Activity({id: activityId});
      this.activity.fetch()
        .fail(errorHandler);
    }
  },

  saved: function(model, status, jqXHR) {
    this.gearCollection.fetch()
      .fail(errorHandler);

    window.location.hash = '#activities';
  },

  error: function() {
    window.location.hash = '#error';
  },

  addGearToActivity: function(gearItem) {
    if(gearItem.get('added')) {
      this.activity.attributes.gear.push(gearItem.get('url'));
    }
  },

  submit: function(event, target, binding) {
    this.activity.set('gear', []);

    _.each(this.gearCollection.models, this.addGearToActivity, this);

    this.activity.save()
      .success(_.bind(this.saved, this))
      .fail(_.bind(this.error, this));
  },

  clean: function() {
    this.gearCollection.off('add', this.checkOverlap, this);

    _.each(this.gearCollection.models, function(gearItem) {
      gearItem.unset('added');
    });

    delete this.rivet;
    this.$el.empty();
  }
});

module.exports = AddGearToActivity;