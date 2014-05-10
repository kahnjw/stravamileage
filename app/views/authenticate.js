'use strict';

var Backbone = require('backbone');
var authenticateTemplate = require('../templates/authenticate.rvt');

var Authenticate = Backbone.View.extend({
  template: authenticateTemplate,

  render: function() {
    this.$el.html(this.template);
  }
});

module.exports = Authenticate;
