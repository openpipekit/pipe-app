/*global PipeApp, Backbone*/

PipeApp.Models = PipeApp.Models || {};

(function () {
    'use strict';

    PipeApp.Models.Terminal = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
          'url': 'http://localhost:8088/terminal'
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
