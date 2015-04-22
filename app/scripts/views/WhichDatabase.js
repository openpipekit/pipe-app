/*global PipeApp, Backbone, JST*/

PipeApp.Views = PipeApp.Views || {};

(function () {
    'use strict';

    PipeApp.Views.WhichDatabase = Backbone.View.extend({

        template: JST['app/scripts/templates/WhichDatabase.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          'click .btn': 'setDeviceCommand'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },

        setDeviceCommand: function() {
          this.model.set('command', this.$el.find('input').val())
          Backbone.history.navigate('configure-database', {trigger: true})
        }

    });

})();
