'use strict';

var Backbone = require('backbone');
var authenticateTemplate = require('../templates/confirm.rvt');
var gearCollection = require('../collections/gear-collection');
var GearModel = require('../models/gear-model');
var rivets = require('rivets');

var DeleteGear = Backbone.View.extend({
  template: authenticateTemplate,

  initialize: function() {
    this.gearCollection = gearCollection;
  },

  render: function(options) {
    this.$el.html(this.template);

    this.rivet = rivets.bind(this.$el, {
      gearItem: this.gearItem,
      controller: this
    });

    this.options = options;
  },

  clean: function() {
    this.rivet.unbind();
    delete this.rivet;
    this.$el.empty();
  },

  confirm: function(e) {
    this.gearItem.destroy();
    window.location.hash = '#mileage';
  },

  getGear: function(gearId) {
    this.gearItem = this.gearCollection.get(gearId);

    if(!this.gearItem) {
      this.gearItem = new GearModel({id: gearId});
      this.gearItem.fetch();
    }
  },

  cancel: function() {
    window.location.hash = '#mileage';
  }
});

module.exports = DeleteGear;
