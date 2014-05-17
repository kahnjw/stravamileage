'use strict';

var Backbone = require('backbone');
var createEditGearTemplate = require('../templates/create-edit-gear.rvt');
var gearCollection = require('../collections/gear-collection');
var GearModel = require('../models/gear-model');
var rivets = require('rivets');
var _ = require('lodash');


var CreateEditGear = Backbone.View.extend({
  template: createEditGearTemplate,

  initialize: function() {
    this.gearModel = new GearModel();
    this.gearCollection = gearCollection;
  },

  render: function() {
    this.$el.html(this.template);

    this.rivet = rivets.bind(this.$el, {
      gearItem: this.gearModel,
      controller: this
    });
  },

  getModel: function(gearId) {
    if(!gearId) {
      this.gearModel = new GearModel();
      return;
    }

    this.gearModel = this.gearCollection.get(gearId);

    if(!this.gearModel) {
      this.gearModel = new GearModel({id: gearId});
      this.gearModel.fetch();
    }
  },

  saved: function(model, status, jqXHR) {
    this.gearCollection.add(model);
    window.location.hash = '#mileage';
  },

  error: function(promise, error, status) {
    this.gearModel.unset('errors');
    this.gearModel.set('errors', promise.responseJSON);
  },

  submit: function(event, target, binding) {
    this.gearModel.save()
      .success(_.bind(this.saved, this))
      .fail(_.bind(this.error, this));
  },

  clean: function() {
    this.rivet.unbind();
    delete this.rivet;
    this.$el.empty();
  }
});

module.exports = CreateEditGear;
