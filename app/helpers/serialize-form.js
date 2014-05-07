'use strict';

var $ = require('jquery');
var _ = require('lodash');

var serializeForm = function(form) {
  var $form = $(form);
  var fields = {};

  _.each($form.serializeArray(), function(item) {
    fields[item.name] = item.value;
  });

  return fields;
};

module.exports = serializeForm;
