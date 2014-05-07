'use strict';

var Backbone = require('backbone');
var userMenuTemplate = require('../templates/user-menu.hbs');

var UserMenu = Backbone.View.extend({
  template: userMenuTemplate,

  render: function() {
    this.$el.html(this.template());
  },

  switchActive: function(menuName) {
    this.$el.find('.active').removeClass('active');
    this.$el.find('.' + menuName).addClass('active');
  }
});

module.exports = UserMenu;
