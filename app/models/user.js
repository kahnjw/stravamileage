define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var _ = require('lodash');
  var globalEvents = require('global-events');

  var User = Backbone.Model.extend({
    url: '/api/v1/users/',

    initialize: function(options) {
      _.extend(this, options);
      this.on('sync', this.complete);
      this.on('error', this.serverError);
    },

    complete: function() {
      globalEvents.trigger('userCreated');
    },

    serverError: function(session, xhr) {
      var errors = {};
      _.extend(errors, xhr.responseJSON);

      this.trigger('invalid', errors);
    }
  });

  return User;
});
