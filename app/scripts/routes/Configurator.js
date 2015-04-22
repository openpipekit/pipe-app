/*global PipeApp, Backbone*/

PipeApp.Routers = PipeApp.Routers || {};

(function () {
    'use strict';

    PipeApp.Routers.Configurator = Backbone.Router.extend({
      routes: {
        '': 'whichDevice',
        'which-device': 'whichDevice',
        'configure-device':'configureDevice'
      },

      whichDevice: function() {

          $('.main').html('<h1>What command controls your device?</h1>')

          var whichDeviceView = new PipeApp.Views.WhichDevice({model: PipeApp.deviceCmd})

          $('.main').append(whichDeviceView.el)

          whichDeviceView.render()

      },

      configureDevice: function() {

        $('.main').html('<h1>Tell us about your device.</h1>')

        var cmdForm = new PipeApp.Views.CmdForm()
        cmdForm.model = PipeApp.deviceCmd
        cmdForm.continuePath = 'which-database'

        $('.main').append(cmdForm.el)

        PipeApp.deviceCmd.setSchema({}, {
          success: function(result) {
            cmdForm.render()
          }
        })
      }

    });

})();
