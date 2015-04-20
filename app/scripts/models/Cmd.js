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

        setSchema: function(callback) {

          var model = this
          if (!callback) callback = function() {}

          exec(this.get('command') + ' --help', function(stdout) {
            if(!stdout) {
              callback('Something went wrong')
            }
            else {
              var options = model.parseOptions(stdout)
              model.schema = model.convertOptionsToSchema(options)
              callback()
            }
          })

        },

        parseOptions: function(stdout) {

          var model = this
          var options = []
          var lines = stdout.split('\n')

          lines.forEach(function(line, i) {

            // Only do something if this is a line declaring a new option
            if (line.indexOf('--') !== -1) {
              var optionText = line
              i++
              while (lines[i] && lines[i].indexOf('--') == -1) {
                optionText += '\n' + lines[i]
                i++
              }
              options.push(model.parseOptionText(optionText))
            }

          })

          debugger

        },

        parseOptionText: function(optionText) {

          var option = {
            'optionName': '', // string
            'takesArguments': null, // boolean
            'argumentName': '', // string
            'argumentRequired': null, // boolean
            'arguments': [], // array
            'helpText': '' // string
          }

          var lines = optionText.split('\n')

          // Handle first line
          // Cut '--' off the beginning of the lines[0].
          var firstLine = lines.shift()
          var firstLine = firstLine.substr(firstLine.indexOf('--')+2, firstLine.length)
          // Chop up the line.
          var fragments = firstLine.split(' ')
          // The first fragment is the optionName
          option.optionName = fragments.shift()
          // Check for an argument placeholder
          if (fragments[0].indexOf('<') !== -1) {
            option.takesArguments = true
            option.argumentRequired = true
            option.argumentName = /<(.*?)>/g.exec(fragments.shift())[1]
          }
          else if (fragments[0].indexOf('[') !== -1) {
            option.takesArguments = true
            option.argumentRequired = false
            option.argumentName = /\[(.*?)\]/g.exec(fragments.shift())[1]
          }
          else {
            option.takesArguments = false
          }
          // The remaining fragments are help text.
          option.helpText = fragments.join(' ')

          // Remaining lines are arguments
          if (option.takesArguments == true && lines.length > 0) {
            lines.forEach(function(line) {
              option.arguments.push(line.trim())
            })
          }

          return option

        },

        convertOptionsToSchema: function(options) {
          // @todo

        },

        runCommand: function() {

        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
