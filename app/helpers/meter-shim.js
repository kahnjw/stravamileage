// HTML5 METER SHIM
// By Jamund Feguson (@xjamundx)
// And Rob Middleton (@rob__ot)
// Mostly stolen from: https://gist.github.com/667320
'use strict';

var jQuery = require('jquery');
var $ = jQuery;
// create shim
jQuery.fn.meterShim = function() {
  console.log($(this));
  // don't waste time if you don't need to
  if (jQuery.fn.meterShim.supportsMeter) {
    return $(this);
  }
  console.log('called');
  
  return $(this).each(function() {

    var $meter = $(this);
    var max = parseFloat($meter.attr('max')) || 1; // default as per HTML5 spec

    var value;
    if($meter.attr('value')) {
      value = parseFloat($meter.attr('value'));
    } else {
      value = $meter.text();
    }

    var $meterShim = $('<div>').addClass('meter chart');

    // replace <meter> with a <div class='meter'>
    $meter.replaceWith($meterShim);
    $meter = $meterShim;

    // here is the template for our indicator
    var $indicator = $('<div>').addClass('indicator');

    // delete any text
    $meter.text('');

    /*
    The following inequalities must hold, as applicable:
        * minimum ≤ value ≤ maximum
        * minimum ≤ low ≤ maximum (if low is specified)
        * minimum ≤ high ≤ maximum (if high is specified)
        * minimum ≤ optimum ≤ maximum (if optimum is specified)
        * low ≤ high (if both low and high are specified)
    */

    if (value > max) {
      value = max;
    }

    var meterWidth = $meter.outerWidth();
    var width = meterWidth * (value / max);
    width = Math.ceil(width);
    $meter.toggleClass('meterIsMaxed', value >= max);
    $indicator.width(width);

    $meter.append($indicator);
  });
};

// checks and adds support
jQuery.fn.meterShim.supportsMeter = 'value' in document.createElement('meter');