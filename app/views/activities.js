define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var ActivitiesCollection = require('collections/activities');
  var activitiesTemplate = require('templates/activities');

  var Activities = Backbone.View.extend({
    events: {
      'click .simple-button': 'refresh'
    },
    template: activitiesTemplate,

    initialize: function() {
      this.activities = new ActivitiesCollection();
      this.activities.fetch();
    },

    render: function() {
      this.listenTo(this.activities, 'add', this.insertView);
      this.insertView();
    },

    insertView: function() {
      var data = { activities: this.activities.toJSON()};

      this.$el.html(this.template(data));
    },

    refresh: function() {
      this.activities.fetch({
        data: {refresh: true}
      });
    }
  });

  return Activities;
});
