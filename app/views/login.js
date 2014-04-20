define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var session = require('models/session');
  var loginTemplate = require('templates/login');
  var serializeForm = require('helpers/serialize-form');
  var $ = require('jquery');
  var _ = require('lodash');

  var Login = Backbone.View.extend({
    template: loginTemplate,
    events: {
      'submit': 'login'
    },

    initialize: function() {
      this.session = session;
    },

    render: function() {
      this.$el.html(this.template());
    },

    login: function(event) {
      event.preventDefault();
      var data = serializeForm(event.target);
      this.session.save(data);
    }
  });

  return Login;
});
