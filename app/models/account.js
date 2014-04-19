define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');

  var Account = Backbone.Model.extend({
    url: 'fixtures/profile-fixture.json'
  });

  return Account;
});