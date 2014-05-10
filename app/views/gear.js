'use strict';

var Backbone = require('backbone');
var gearTemplate = require('../templates/gear.rvt');
var gearCollection = require('../collections/gear-collection');
var rivets = require('rivets');

var Gear = Backbone.View.extend({
  template: gearTemplate,

  initialize: function() {
    this.gearCollection = gearCollection;
    this.gearCollection.fetch();
  },

  render: function() {
    this.$el.html(this.template);

    rivets.bind(this.$el, {
      gearCollection: this.gearCollection,
      controller: this
    });
  }
});


module.exports = Gear;
