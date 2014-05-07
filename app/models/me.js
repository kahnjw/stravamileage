'use strict';

var Backbone = require('backbone');

var Me = Backbone.Model.extend({
  url: '/api/v1/users/me/',
});

module.exports = Me;
