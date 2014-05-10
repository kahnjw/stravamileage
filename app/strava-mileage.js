'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('./router');

require('./rivets/config');
require('./rivets/adapter');
require('./rivets/binders');
require('./rivets/formatters');

Backbone.$ = $;

new Router();
Backbone.history.start();
