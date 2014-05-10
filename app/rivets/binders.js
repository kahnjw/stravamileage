'use strict';

var rivets = require('rivets');


var generateHref = function(route, value) {
  var replaceRegex = /(:\w+)/;

  return route.replace(replaceRegex, value);
};

rivets.binders.href = function (el, value) {
  var route = el.getAttribute('route');
  var href = generateHref(route, value);

  el.setAttribute('href', href);
};
