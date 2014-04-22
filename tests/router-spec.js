/* global afterEach */
define(function(require, exports, module){
  'use strict';

  describe('Router', function() {

    var Backbone = require('backbone');
    var $ = require('jquery');
    var Router = require('router');
    var router;
    var trigger = {trigger: true};

    describe('route functions', function() {
      beforeEach(function() {
        // The Backbone history code dodges our spies
        // unless we set them up exactly like this:
        Backbone.history.stop();
        spyOn(Router.prototype, 'setup');

        router = new Router({el: $('<div>')});
        Backbone.history.start();
      });

      it('empty route goes to mileage view', function(){
        router.navigate('', trigger);
        expect(router.setup).toHaveBeenCalledWith('mileage');
      });

      it('mileage route goes to mileage view', function(){
        router.navigate('mileage', trigger);
        expect(router.setup).toHaveBeenCalledWith('mileage');
      });

      it('authenticate route goes to authenticate view', function(){
        router.navigate('authenticate', trigger);
        expect(router.setup).toHaveBeenCalledWith('authenticate', true);
      });

      it('profile route goes to profile view', function(){
        router.navigate('profile', trigger);
        expect(router.setup).toHaveBeenCalledWith('profile');
      });

      it('gear route goes to gear view', function(){
        router.navigate('gear', trigger);
        expect(router.setup).toHaveBeenCalledWith('gear');
      });

      it('more route goes to more view', function(){
        router.navigate('more', trigger);
        expect(router.setup).toHaveBeenCalledWith('more');
      });
    });
  });
});