define(function(require, exports, module) {
  "use strict";

  var Backbone = require("backbone");
  var $ = require('jquery');
  var pageTemplate = require("templates/page");
  var UserMenu = require('views/user-menu');

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
    }
  });

  return Page;
});
