define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var User = require('models/user');
  var signupTemplate = require('templates/signup');
  var serializeForm = require('helpers/serialize-form');

  var Signup = Backbone.View.extend({
    template: signupTemplate,
    events: {
      'submit': 'signup'
    },

    initialize: function() {
      this.user = new User();
    },

    render: function() {
      this.$el.html(this.template());
    },

    signup: function(event) {
      event.preventDefault();
      var data = serializeForm(event.target);
      this.user.save(data);
    }
  });

  return Signup;
});
