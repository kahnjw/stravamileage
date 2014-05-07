'use strict';

var Backbone = require('backbone');

var Account = Backbone.Model.extend({
  url: 'api/v1/strava/me/'
});

module.exports = Account;