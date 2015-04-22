/*global PipeApp, Backbone, JST*/

PipeApp.Views = PipeApp.Views || {};

(function () {
    'use strict';

    PipeApp.Views.CmdForm = Backbone.View.extend({

        template: JST['app/scripts/templates/CmdForm.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
        },

        render: function () {
          var vars = {
            form: ''
          }
          var form = new Backbone.Form({
              model: this.model
          }).render();
          vars.form = form.$el.html()
          this.$el.html(this.template(vars));
        }

    });

})();
