'use strict';

var Backbone = require('backbone');
var profileTemplate = require('../templates/profile.rvt');
var AccountModel = require('../models/account');
var rivets = require('rivets');

var Profile = Backbone.View.extend({
  template: profileTemplate,

  initialize: function() {
    this.account = new AccountModel();
    this.account.fetch();
  },

  render: function() {
    this.$el.html(this.template);

    rivets.bind(this.$el, {
      profile: this.account,
      controller: this
    });
  }
});

module.exports = Profile;
