define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var gearTemplate = require('templates/gear');

  var Gear = Backbone.View.extend({
    template: gearTemplate,

    render: function() {
      this.$el.html(this.template());
    }
  });

  return Gear;
});
