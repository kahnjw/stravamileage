'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('./router');

require('./helpers/rivets-overrides');
Backbone.$ = $;

new Router();
Backbone.history.start();
