'use strict';

var Backbone = require('backbone');
var userMenuTemplate = require('../templates/user-menu.rvt');
var activitiesIcon = require('../../images/activities-icon.svg');
var rivets = require('rivets');

var UserMenu = Backbone.View.extend({
  template: userMenuTemplate,

  render: function() {
    this.$el.html(this.template);

    rivets.bind(this.$el, {
      activitiesIcon: activitiesIcon
    });
  },

  switchActive: function(menuName) {
    this.$el.find('.active').removeClass('active');
    this.$el.find('.' + menuName).addClass('active');
  }
});

module.exports = UserMenu;
