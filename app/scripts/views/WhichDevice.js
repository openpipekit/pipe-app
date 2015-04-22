/*global PipeApp, Backbone, JST*/

PipeApp.Views = PipeApp.Views || {};

(function () {
    'use strict';

    PipeApp.Views.WhichDevice = Backbone.View.extend({

        template: JST['app/scripts/templates/WhichDevice.ejs'],

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
          Backbone.history.navigate('configure-device', {trigger: true})
        }

    });

})();
