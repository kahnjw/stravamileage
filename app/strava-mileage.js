define(function(require, exports, module){
  'use strict';

  var Router = require('router');
  var Backbone = require('backbone');
  require('require-runtime-config');

  var router = new Router();
  Backbone.history.start();
});
