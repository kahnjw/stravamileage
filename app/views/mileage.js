'use strict';

var Backbone = require('backbone');
var mileageTemplate = require('../templates/mileage.rvt');
var gearCollection = require('../collections/gear-collection');
var rivets = require('rivets');

var Mileage = Backbone.View.extend({
  template: mileageTemplate,

  initialize: function() {
    this.gearCollection = gearCollection;
    this.gearCollection.fetch();
  },

  render: function() {
    this.$el.html(this.template);

    rivets.bind(this.$el, {
      mileages: this.gearCollection,
      controller: this
    });
  }
});

module.exports = Mileage;
