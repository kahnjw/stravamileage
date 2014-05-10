'use strict';

var Backbone = require('backbone');
var mileageTemplate = require('../templates/mileage.rvt');
var MileageCollection = require('../collections/mileage');
var rivets = require('rivets');
var $ = require('jquery');
var _ = require('lodash');

var Mileage = Backbone.View.extend({
  template: mileageTemplate,

  initialize: function() {
    this.collection = new MileageCollection();
    this.collection.fetch();
  },

  render: function() {
    this.listenTo(this.collection, 'add', _.bind(this.drawGraphs, this));
    this.insertView();
  },

  insertView: function() {
    this.$el.html(this.template);

    rivets.bind(this.$el, {
      mileages: this.collection,
      controller: this
    });

    this.drawGraphs();
  },

  modelToJson: function(model) {
    return model.toJSON();
  },

  drawGraphs: function() {
    _.each(this.collection.models, function(model) {
      var percent = model.attributes.mileage / model.attributes.lifetime;
      var $item = $('.' + model.attributes.id);

      if(percent > 1) {
        model.attributes.over = true;
        percent = 1;
      }
      $item.find('.bar').width((percent * 100 + '%'));
    });
  }
});

module.exports = Mileage;
