'use strict';

var Backbone = require('backbone');

var MileageCollection = Backbone.Collection.extend({
  url: 'fixtures/mileage-fixtures.json'
});

module.exports = MileageCollection;
