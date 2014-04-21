define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var profileTemplate = require('templates/profile');
  var AccountModel = require('models/account');
  var ActivitiesView = require('views/activities');

  var Profile = Backbone.View.extend({
    template: profileTemplate,

    initialize: function() {
      this.account = new AccountModel();
      this.account.fetch();

      this.activities = new ActivitiesView();
    },

    render: function() {
      this.listenTo(this.account, 'change', this.insertView);
      this.insertView();
    },

    insertView: function() {
      var data = this.account.toJSON();

      this.$el.html(this.template(data));
      this.insertActivities();
    },

    insertActivities: function() {
      this.activities.setElement('.activities');
      this.activities.render();
    }
  });

  return Profile;
});
