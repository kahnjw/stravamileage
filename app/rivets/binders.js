'use strict';

var $ = require('jquery');
var _ = require('lodash');
var gearCollection = require('../collections/gear-collection');
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

rivets.binders.contents = function(el, value) {
  el.innerHTML = value;
};

rivets.binders.error = function(el, value) {
  var $el = $(el);

  if(value) {
    el.innerHTML = value;
    $el.addClass('open');
    return;
  }
  el.innerHTML = '';
  $el.removeClass('open');
};

rivets.binders.errorclass = function(el, value) {
  var $el = $(el);

  if(value) {
    $el.addClass('inputError');
    return;
  }

  $el.removeClass('inputError');
};

rivets.binders.optimum = function(el, value) {
  var $el = $(el);

  $el.attr('optimum', value);
};

rivets.binders.gearformat = function(el, value) {
  _.each(gearCollection.models, function(model) {
    if(model.get('url') === value) {
      el.innerHTML = model.get('name');
    }
  });
};
