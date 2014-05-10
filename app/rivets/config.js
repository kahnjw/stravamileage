'use strict';

var rivets = require('rivets');

rivets.configure({
  handler: function(target, event, binding) {
    event.preventDefault();
    this(target, event, binding.view.models);
  }
});
