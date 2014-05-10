'use strict';

var Backbone = require('backbone');
var loginTemplate = require('../templates/login.rvt');
var session = require('../models/session');
var $ = require('jquery');
var _ = require('lodash');

var SessionView = Backbone.View.extend({
  events: {
    'submit': 'submit'
  },
  template: loginTemplate,

  initialize: function() {
    this.session = session;
  },

  render: function() {
    this.$el.html(this.template);
  },

  loggedIn: function() {
    window.location.hash = '#mileage';
  },

  failed: function() {
    console.log('Login failed');
  },

  submit: function(event) {
    event.preventDefault();
    var $form = $(event.target);
    var fields = {};

    _.each($form.serializeArray(), function(item) {
      fields[item.name] = item.value;
    });

    this.session.set(fields);
    this.session.save()
      .success(_.bind(this.saved, this))
      .fail(_.bind(this.failed, this));
  }
});


module.exports = SessionView;
