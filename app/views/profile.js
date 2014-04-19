define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var profileTemplate = require('templates/profile');
  var AccountModel = require('models/account');

  var Profile = Backbone.View.extend({
    template: profileTemplate,

    initialize: function() {
      this.account = new AccountModel();
      this.account.fetch();
    },

    render: function() {
      this.listenTo(this.account, 'change', this.insertView);
      this.insertView();
    },

    insertView: function() {
      var data = this.account.toJSON();

      this.$el.html(this.template(data));
    }
  });

  return Profile;
});
