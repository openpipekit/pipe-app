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
              var schema = {}
              response.forEach(function (option) {
                schema[option.optionName] = convertOptionToField(option)
              })
              model.schema = schema
              exits.success(schema)
            }
          })

          var convertOptionToField = function(option) {
            var field = {}
            if (option.takesArguments == true && option.arguments.length > 0) {
              field.type = 'Select'
              field.options = option.arguments
              if (option.argumentRequired === false) {
                field.options.unshift({label:'default',val:''})
              }
            }
            else if (option.takesArguments == true && option.arguments.length === 0) {
              field.type = 'Text'
            }
            if (option.helpText !== '') {
              field.help = option.helpText
            }
            if (option.argumentRequired === true) {
              field.validators = ['required']
            }
            return field
          }

        },

        runCommand: function(inputs, exits) {

        },



    });

})();
