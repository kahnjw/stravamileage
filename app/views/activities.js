define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var ActivitiesCollection = require('collections/activities');
  var activitiesTemplate = require('templates/activities');

  var Activities = Backbone.View.extend({
    template: activitiesTemplate,

    initialize: function() {
      var fetchOptions = {
        data: {
          'distance': 'miles',
          'total_elevation_gain': 'feet'
        }
      };

      this.activities = new ActivitiesCollection();
      this.activities.fetch(fetchOptions);
    },

    render: function() {
      this.listenTo(this.activities, 'add', this.insertView);
      this.insertView();
    },

    insertView: function() {
      var data = { activities: this.activities.toJSON()};

      this.$el.html(this.template(data));
    }
  });

  return Activities;
});
