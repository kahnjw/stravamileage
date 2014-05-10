'use strict';

var Backbone = require('backbone');
var profileTemplate = require('../templates/profile.rvt');
var AccountModel = require('../models/account');
var ActivitiesView = require('./activities');
var rivets = require('rivets');

var Profile = Backbone.View.extend({
  template: profileTemplate,

  initialize: function() {
    this.account = new AccountModel();
    this.account.fetch();

    this.activities = new ActivitiesView();
  },

  render: function() {
    this.$el.html(this.template);

    rivets.bind(this.$el, {
      profile: this.account,
      controller: this
    });

    this.insertActivities();
  },

  insertActivities: function() {
    this.activities.setElement('.activities');
    this.activities.render();
  }
});

module.exports = Profile;
