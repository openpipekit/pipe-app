/*global PipeApp, Backbone, JST*/

PipeApp.Views = PipeApp.Views || {};

(function () {
    'use strict';

    PipeApp.Views.Start = Backbone.View.extend({

        template: JST['app/scripts/templates/Start.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          'click .btn': 'start'
        },

        initialize: function () {
        },

        render: function () {
          this.$el.html(this.template());
        },

        start: function() {
           PipeApp.terminalView.toggle()
           var interval = this.$el.find('input').val()
           var cmd = 'watch -n' + interval + ' "'
           cmd += PipeApp.deviceCmd.generate() + ' | ' + PipeApp.databaseCmd.generate()
           cmd += '"'
           exec(cmd, function(result) {

           })
        }

    });

})();
