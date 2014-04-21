define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');

  var Activities = Backbone.Collection.extend({
    url: 'api/v1/activities/'
  });

  return Activities;
});
