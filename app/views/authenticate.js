define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var authenticateTemplate = require('templates/authenticate');

  var Authenticate = Backbone.View.extend({
    template: authenticateTemplate,

    render: function() {
      this.$el.html(this.template());
    }
  });

  return Authenticate;
});
