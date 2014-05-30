'use strict';

var Backbone = require('backbone');
var mileageTemplate = require('../templates/mileage.rvt');
var gearCollection = require('../collections/gear-collection');
var errorHandler = require('../helpers/error-handler');
var rivets = require('rivets');
var $ = require('jquery');

require('../helpers/meter-shim');

var Mileage = Backbone.View.extend({
  template: mileageTemplate,

  initialize: function() {
    this.gearCollection = gearCollection;
    this.gearCollection.fetch()
      .fail(errorHandler);

    this.gearCollection.on('add', this.polyfillMeters);
  },

  render: function() {
    this.$el.html(this.template);

    this.rivet = rivets.bind(this.$el, {
      mileages: this.gearCollection,
      controller: this
    });

    this.polyfillMeters();
  },

  polyfillMeters: function() {
    $('meter').meterShim();
  },

  clean: function() {
    this.rivet.unbind();
    delete this.rivet;
    this.$el.empty();
  }
});

module.exports = Mileage;
