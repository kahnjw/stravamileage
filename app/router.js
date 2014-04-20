define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var Page = require('views/page');
  var Mileage = require('views/mileage');
  var Profile = require('views/profile');
  var More = require('views/more');
  var Authenticate = require('views/authenticate');

  var Router = Backbone.Router.extend({
    routes: {
      '(/)': 'root',
      '(/)authenticate(/)': 'authenticate',
      '(/)mileage(/)': 'mileage',
      '(/)profile(/)': 'profile',
      '(/)gear(/)': 'gear',
      '(/)more(/)': 'more'
    },

    initialize: function() {
      this.page = new Page({el: 'body'});
      this.page.render();

      this.mileage = new Mileage();
      this.profile = new Profile();
      this.more = new More();
      this.authenticate = new Authenticate();
    },

    root: function() {
      this.navigate('mileage', true);
    },

    authenticate: function() {
      this.setup('authenticate', true);
    },

    mileage: function() {
      this.setup('mileage');
    },

    profile: function() {
      this.setup('profile');
    },

    gear: function() {
      this.page.updateMenu('gear');
      this.page.swapFrontBack();
    },

    more: function() {
      this.setup('more');
    },

    setup: function(viewName, hideMenu) {
      if(hideMenu) {
        this.page.hideMenu();
      } else {
        this.page.showMenu();
      }
      this.page.updateMenu(viewName);
      this[viewName].setElement('.back');
      this[viewName].render();
      this.page.swapFrontBack();
    }

  });

  return Router;
});
