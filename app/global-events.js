define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");
  var _ = require("lodash");

  var globalEvents = {};

  return _.extend(globalEvents, Backbone.Events);
});
