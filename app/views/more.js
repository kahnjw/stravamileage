'use strict';

var Backbone = require('backbone');
var moreTemplate = require('../templates/more.rvt');

var More = Backbone.View.extend({
  template: moreTemplate,

  render: function() {
    this.$el.html(this.template);
  },

  clean: function() {
    this.$el.empty();
  }
});

module.exports = More;
