define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var _ = require('lodash');
  var globalEvents = require('global-events');

  var Session = Backbone.Model.extend({
    url: '/api/v1/auth',

    initialize: function(options) {
      _.extend(this, options);
      this.on('sync', this.complete);
      this.on('error', this.serverError);
    },

    complete: function() {
      globalEvents.trigger('sessionCreated');
    },

    serverError: function(session, xhr) {
      var errors = {};

      if(xhr.status === 403) {
        errors.notAuthorized = 'Email/Password mismatch';
      }

      _.extend(errors, xhr.responseJSON);

      this.trigger('invalid', errors);
    }
  });

  return Session;
});
