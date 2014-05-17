'use strict';

var Backbone = require('backbone');
var authenticateTemplate = require('../templates/authenticate.rvt');
var $ = require('jquery');

var Authenticate = Backbone.View.extend({
  template: authenticateTemplate,

  render: function() {
    this.$el.html(this.template);
    this.$body = $('body');
    this.$body.addClass('authenticate');
  },

  clean: function() {
    this.$body.removeClass('authenticate');
    this.$el.empty();
  }
});

module.exports = Authenticate;
