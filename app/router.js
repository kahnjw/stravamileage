'use strict';

var Backbone = require('backbone');
var Page = require('./views/page');
var Mileage = require('./views/mileage');
var Profile = require('./views/profile');
var More = require('./views/more');
var Authenticate = require('./views/authenticate');
var Gear = require('./views/gear');
var globalEvents = require('./global-events');
var csrf = require('./helpers/csrf');
var CreateEditGear = require('./views/create-edit-gear');
var LoginView = require('./views/login');
var AddGearView = require('./views/add-gear');
var ActivitiesView = require('./views/activities');

var Router = Backbone.Router.extend({
  routes: {
    '(/)': 'root',
    '(/)authenticate(/)': 'authenticate',
    '(/)mileage(/)': 'mileage',
    '(/)profile(/)': 'profile',
    '(/)gear/:gearId/edit(/)': 'createEditGear',
    '(/)activities/:activityId/addgear(/)': 'addGearToActivity',
    '(/)gear/create(/)': 'createEditGear',
    '(/)gear(/)': 'gear',
    '(/)activities(/)': 'activities',
    '(/)more(/)': 'more',
    '(/)login(/)': 'login'
  },

  initialize: function(options) {
    if(options && options.page) {
      this.page = new Page({el: options.page});
    } else {
      this.page = new Page({el: 'body'});
    }
    this.page.render();

    this.mileage = new Mileage();
    this.profile = new Profile();
    this.more = new More();
    this.authenticate = new Authenticate();
    this.gear = new Gear();
    this.createEditGear = new CreateEditGear();
    this.login = new LoginView();
    this.addGear = new AddGearView();
    this.activities = new ActivitiesView();

    this.wireRoutingEvents();

    csrf.setCsrfToken();
  },

  root: function() {
    this.navigate('mileage', true);
  },

  activities: function() {
    this.setup('activities');
  },

  authenticate: function() {
    this.setup('authenticate', true);
  },

  login: function() {
    this.setup('login', true);
  },

  mileage: function() {
    this.setup('mileage');
  },

  profile: function() {
    this.setup('profile');
  },

  gear: function() {
    this.setup('gear');
  },

  addGearToActivity: function(activityId) {
    this.addGear.getActivity(activityId);
    this.setup('addGear');
  },

  createEditGear: function(gearId) {
    this.createEditGear.getModel(gearId);

    this.setup('createEditGear');
  },

  more: function() {
    this.setup('more');
  },

  setup: function(viewName, hideMenu) {
    if(this.currentView && this.currentView.clean) {
      this.currentView.clean();
    }

    if(hideMenu) {
      this.page.hideMenu();
    } else {
      this.page.showMenu();
    }

    this.page.updateMenu(viewName);
    this[viewName].setElement('.back');
    this[viewName].render();
    this.page.swapFrontBack();

    this.currentView = this[viewName];
  },

  enter: function() {
    this.navigate('mileage', true);
  },

  wireRoutingEvents: function() {
    globalEvents.on('sessionCreated', this.enter, this);
    globalEvents.on('userCreated', this.enter, this);
  }

});

module.exports = Router;
