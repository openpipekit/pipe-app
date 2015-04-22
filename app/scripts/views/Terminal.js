/*global PipeApp, Backbone, JST*/

PipeApp.Views = PipeApp.Views || {};

(function () {
    'use strict';

    PipeApp.Views.Terminal = Backbone.View.extend({

        template: JST['app/scripts/templates/Terminal.ejs'],

        tagName: 'div',

        className: 'terminal',

        events: {
          'click button': 'toggle'
        },

        initialize: function () {
          this.drawer = true
          this.height = $(window).height()/3
        },

        render: function () {
          this.listenForExec()
          this.$el.html(this.template(this.model.toJSON()))
          this.$el.find('.terminal__console').height(this.height)
          this.updateDrawer()
        },

        toggle: function() {
          this.drawer = !this.drawer
          this.updateDrawer()
        },

        updateDrawer: function() {
          if (this.drawer) {
            this.$el.css('bottom', '0px')
            this.$el.find('button').text('close terminal')
          }
          else {
            this.$el.css('bottom', '-' + this.height + 'px')
            this.$el.find('button').text('open terminal')
          }

        },

        listenForExec: function() {
          var view = this
          var check = function() {
            if (window.hasOwnProperty('exec')) {
              view.trigger('execReady')
            }
            else {
              setTimeout(check,300)
            }
          }
          check()

        }

    });

})();
