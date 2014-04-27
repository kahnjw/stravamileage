define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');

  var GearModel = Backbone.Model.extend({
    urlRoot: function(){
      if(this.id) {
        return '/api/v1/gear/' + this.id + '/';
      }
      return '/api/v1/gear/';
    }
  });

  return GearModel;
});