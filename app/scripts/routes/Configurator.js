/*global PipeApp, Backbone*/

PipeApp.Routers = PipeApp.Routers || {};

(function () {
    'use strict';

    PipeApp.Routers.Configurator = Backbone.Router.extend({
      routes: {
        '': 'whichDevice',
        'which-device': 'whichDevice',
        'configure-device':'configureDevice',
        'which-database': 'whichDatabase',
        'configure-database':'configureDatabase',
        'start': 'start'
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
      },

      whichDatabase: function() {

          $('.main').html('<h1>What database do you want to data to?</h1>')

          var whichDatabaseView = new PipeApp.Views.WhichDatabase({model: PipeApp.databaseCmd})

          $('.main').append(whichDatabaseView.el)

          whichDatabaseView.render()

      },

      configureDatabase: function() {

        $('.main').html('<h1>Tell us about your database.</h1>')

        var cmdForm = new PipeApp.Views.CmdForm()
        cmdForm.model = PipeApp.databaseCmd
        cmdForm.continuePath = 'start'

        $('.main').append(cmdForm.el)

        PipeApp.databaseCmd.setSchema({}, {
          success: function(result) {
            cmdForm.render()
          }
        })
      },

      start: function() {

          $('.main').html('<h1>Let\'s start piping data. How often in seconds should we pipe data?</h1>')

          var startView = new PipeApp.Views.Start()

          $('.main').append(startView.el)

          startView.render()

      }

    });

})();
