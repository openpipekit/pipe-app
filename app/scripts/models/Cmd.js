/*global PipeApp, Backbone*/

PipeApp.Models = PipeApp.Models || {};

(function () {
    'use strict';

    PipeApp.Models.Cmd = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
          'command': null
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        },

        setSchema: function(inputs, exits) {

          var model = this
          var cli = new Cli(this.get('command'))
          cli.options({}, {
            error: function(response) {
              console.log(response)
            },
            success: function(response) {
              model.schema = model.convertOptionsToSchema({options: response}, {
                success: function(result) {
                  model.schema = result
                  exits.success(result)
                }
              })
            }
          })

        },

        convertOptionsToSchema: function(inputs, exits) {
          var options = inputs.options
          // @todo
          var schema = options
          exits.success(schema)
        },

        runCommand: function(inputs, exits) {

        },



    });

})();
