define(function(require, exports, module){
  'use strict';

  var Backbone = require('backbone');
  var createEditGearTemplate = require('templates/create-edit-gear');
  var GearCollection = require('collections/gear-collection');
  var GearModel = require('models/gear-model');
  var $ = require('jquery');
  var _ = require('lodash');

  var CreateEditGear = Backbone.View.extend({
    events: {
      'submit': 'submit'
    },
    template: createEditGearTemplate,

    initialize: function(options) {
      if(options && options.id) {
        this.gearModel = new GearModel({id:options.id});
      }
    },

    render: function() {
      if(this.gearModel) {
        this.listenTo(this.gearModel, 'change', this.insertView);
      }
      this.insertView();
    },

    insertView: function() {
      var data;

      if(this.gearModel) {
        data = {gear: this.gearModel.toJSON()};
      }

      this.$el.html(this.template(data));
    },

    saved: function() {
      window.location.hash = '#gear';
    },

    submit: function(event) {
      event.preventDefault();
      var $form = $(event.target);
      var fields = {};

      _.each($form.serializeArray(), function(item) {
        fields[item.name] = item.value;
      });

      this.gearModel = this.gearModel || new GearModel(fields);
      this.gearModel.save()
        .success(_.bind(this.saved, this));
    }
  });


  return CreateEditGear;
});
