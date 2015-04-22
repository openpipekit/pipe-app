/*global PipeApp, Backbone, JST*/

PipeApp.Views = PipeApp.Views || {};

(function () {
    'use strict';

    PipeApp.Views.CmdForm = Backbone.View.extend({

        template: JST['app/scripts/templates/CmdForm.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          'click .test': 'testCmd',
          'click .continue': 'continue'
        },

        initialize: function () {
        },

        render: function () {
          var vars = {
            form: ''
          }
          this.form = new Backbone.Form({
            model: this.model
          }).render();
          this.$el.append(this.form.el)
          this.$el.append(this.template(vars));
        },

        testCmd: function() {
          // Commit form to model
          this.form.commit()
          //PipeApp.terminalView.toggle()
          this.model.run(null, {
            error: function(result) {
              alert(result)
            },
            success: function(result) {
              alert(result)
            }
          })
        },

        continue: function() {
          this.form.commit()
          Backbone.history.navigate(this.continuePath, {trigger: true})
        }

    });

})();
