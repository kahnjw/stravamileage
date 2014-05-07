"use strict";

var Backbone = require("backbone");
var _ = require("lodash");

var globalEvents = {};

module.exports = _.extend(globalEvents, Backbone.Events);
