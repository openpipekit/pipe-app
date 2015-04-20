/*global PipeApp, Backbone*/

PipeApp.Routers = PipeApp.Routers || {};

(function () {
    'use strict';

    PipeApp.Routers.Configurator = Backbone.Router.extend({
      routes: {
        '': 'routeStart',
        'configure-device':'configureDevice'
      },
      configureDevice: function() {
        $('.main').html('heyo')
      }

    });

})();
