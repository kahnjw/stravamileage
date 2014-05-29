'use strict';

var Backbone = require('backbone');
var gearTemplate = require('../templates/gear.rvt');
var gearCollection = require('../collections/gear-collection');
var rivets = require('rivets');
var errorHandler = require('../helpers/error-handler');

var Gear = Backbone.View.extend({
  template: gearTemplate,

  initialize: function() {
    this.gearCollection = gearCollection;
    this.gearCollection.fetch()
      .fail(errorHandler);
  },

  render: function() {
    this.$el.html(this.template);

    this.rivet = rivets.bind(this.$el, {
      gearCollection: this.gearCollection,
      controller: this
    });
  },

  clean: function() {
    this.rivet.unbind();
    this.$el.emtpy();
  }
});


module.exports = Gear;
