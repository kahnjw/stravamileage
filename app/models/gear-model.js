'use strict';

var Backbone = require('backbone');

var GearModel = Backbone.Model.extend({
  urlRoot: function(){
    if(this.get('id')) {
      return '/api/v1/gear/' + this.get('id') + '/';
    }
    return '/api/v1/gear/';
  }
});

module.exports = GearModel;
