define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var moreTemplate = require('templates/more');

  var More = Backbone.View.extend({
    template: moreTemplate,

    render: function() {
      this.$el.html(this.template());
    }
  });

  return More;
});
