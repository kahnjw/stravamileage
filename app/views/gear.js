define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var gearTemplate = require('templates/gear');
  var GearCollection = require('collections/gear-collection');

  var Gear = Backbone.View.extend({
    template: gearTemplate,

    initialize: function() {
      this.gearCollection = new GearCollection();
      this.gearCollection.fetch();
    },

    render: function() {
      this.listenTo(this.gearCollection, 'add', this.insertView);
      this.insertView();
    },

    insertView: function() {
      var data = { gear: this.gearCollection.toJSON()};

      this.$el.html(this.template(data));
    },
  });


  return Gear;
});
