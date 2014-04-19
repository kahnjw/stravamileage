define(function(require, exports, module) {
  'use strict';

  var Backbone = require('backbone');

  var MileageCollection = Backbone.Collection.extend({
    url: 'fixtures/mileage-fixtures.json'
  });

  return MileageCollection;
});