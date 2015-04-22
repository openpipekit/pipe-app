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
            // @todo Look for boolean fields, might need to be in the Cmd class
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

        run: function(inputs, exits) {
          var cmd = this.get('command')
          _.each(this.attributes, function(value, key, list) {
            // @todo If optional and null and text, then don't add it
            // @todo look for boolean flags
            if (key !== 'command') cmd += ' --' + key + ' ' + value
          })
          exec(cmd, function(response) {
            if (!response) {
              exits.error('Something went wrong.')
            }
            else {
              exits.success(response)
            }
          })
        },



    });

})();
