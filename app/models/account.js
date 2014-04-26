define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');

  var Account = Backbone.Model.extend({
    url: 'api/v1/strava/me/'
  });

  return Account;
});