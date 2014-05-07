'use strict';

var Backbone = require('backbone');
var pageTemplate = require('../templates/page.hbs');
var UserMenu = require('./user-menu');

var attachFastClick = require('fastclick');
attachFastClick(document.body);

var Page = Backbone.View.extend({
  template: pageTemplate,

  render: function() {
    this.$el.html(this.template());

    this.userMenu = new UserMenu({el: '.user'});
    this.userMenu.render();
  },

  updateMenu: function(menuName) {
    this.userMenu.switchActive(menuName);
  },

  swapFrontBack: function() {
    this.$el.find('.fade-page').toggleClass('front back');
    this.$el.find('.back').empty();
  },

  hideMenu: function() {
    this.userMenu.$el.hide();
  },

  showMenu: function() {
    this.userMenu.$el.show();
  }
});

module.exports = Page;
