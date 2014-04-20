define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var mileageTemplate = require('templates/mileage');
  var MileageCollection = require('collections/mileage');
  var $ = require('jquery');
  var _ = require('lodash');

  var Mileage = Backbone.View.extend({
    template: mileageTemplate,

    initialize: function() {
      this.collection = new MileageCollection();
      this.collection.fetch();
    },

    render: function() {
      this.listenTo(this.collection, 'add', _.bind(this.insertView, this));
      this.insertView();
    },

    insertView: function() {
      var data = {
        mileages: _.map(this.collection.models, this.modelToJson)
      };

      this.$el.html(this.template(data));
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

  return Mileage;
});
