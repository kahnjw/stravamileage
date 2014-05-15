'use strict';

var Backbone = require('backbone');

var Activity = Backbone.Model.extend({
  url: function() {
    if(this.get('id')) {
      return '/api/v1/activities/' + this.get('id') + '/';
    }
    return '/api/v1/activities/';
  },

  gearList: function() {
    return this.get('gear');
  }
});

module.exports = Activity;
