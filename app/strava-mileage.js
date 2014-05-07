'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('./router');

Backbone.$ = $;

new Router();
Backbone.history.start();
