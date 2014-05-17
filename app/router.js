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
var AddGearToActivityView = require('./views/add-gear-to-activity');
var ActivitiesView = require('./views/activities');
var DeleteGear = require('./views/delete-gear');

var Router = Backbone.Router.extend({
  routes: {
    '(/)': 'root',
    '(/)authenticate(/)': 'authenticate',
    '(/)mileage(/)': 'mileage',
    '(/)profile(/)': 'profile',
    '(/)gear/:gearId/edit(/)': 'createEditGear',
    '(/)gear/:gearId/delete(/)': 'deleteGear',
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
    this.addGearToActivityView = new AddGearToActivityView();
    this.activities = new ActivitiesView();
    this.deleteGear = new DeleteGear();

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

  deleteGear: function(gearId) {
    this.deleteGear.getGear(gearId);
    this.setup('deleteGear');
  },

  addGearToActivity: function(activityId) {
    this.addGearToActivityView.getActivity(activityId);
    this.setup('addGearToActivityView');
  },

  createEditGear: function(gearId) {
    this.createEditGear.getModel(gearId);

    this.setup('createEditGear');
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

    if(this.currentView && this.currentView.clean) {
      this.currentView.clean();
    }

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
