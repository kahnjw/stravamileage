'use strict';

var errorHandler = function(error) {
  if(error.status && error.status === 403) {
    window.location.hash = 'authenticate';
  }
};

module.exports = errorHandler;
