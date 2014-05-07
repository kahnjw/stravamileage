'use strict';

var Backbone = require('backbone');
var GearModel = require('../models/gear-model');

var GearCollection = Backbone.Collection.extend({
  model: GearModel,
  url: 'api/v1/gear/'
});

module.exports = GearCollection;
