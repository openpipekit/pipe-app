/*global PipeApp, Backbone, JST*/

PipeApp.Views = PipeApp.Views || {};

(function () {
    'use strict';

    PipeApp.Views.Terminal = Backbone.View.extend({

        template: JST['app/scripts/templates/Terminal.ejs'],

        tagName: 'div',

        id: 'terminal',

        className: '',

        events: {
          'click button': 'toggleTerminal' 
        },

        initialize: function () {
          this.inView = true 
        },

        render: function () {
          this.$el.html(this.template());
          this.$el.find('iframe').width($(window).width())
          this.setView()
        },

        toggleTerminal: function() {
          this.inView = !this.inView
          this.setView()
        },

        setView: function() {
          if (this.inView) {
            this.$el.css('bottom', '0px')
            this.$el.find('button').text('close terminal')
          }
          else {
            this.$el.css('bottom', '-300px')
            this.$el.find('button').text('open terminal')
          }

        }

    });

})();
