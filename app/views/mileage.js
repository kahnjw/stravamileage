'use strict';

var Backbone = require('backbone');
var mileageTemplate = require('../templates/mileage.rvt');
var MileageCollection = require('../collections/mileage');
var rivets = require('rivets');

var Mileage = Backbone.View.extend({
  template: mileageTemplate,

  initialize: function() {
    this.collection = new MileageCollection();
    this.collection.fetch();
  },

  render: function() {
    this.$el.html(this.template);

    rivets.bind(this.$el, {
      mileages: this.collection,
      controller: this
    });
  },

  modelToJson: function(model) {
    return model.toJSON();
  }
});

module.exports = Mileage;
