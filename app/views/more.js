'use strict';

var Backbone = require('backbone');
var moreTemplate = require('../templates/more.hbs');

var More = Backbone.View.extend({
  template: moreTemplate,

  render: function() {
    this.$el.html(this.template());
  }
});

module.exports = More;
