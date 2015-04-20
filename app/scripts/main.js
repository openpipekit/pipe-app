/*global PipeApp, $*/


window.PipeApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict'

        var terminalView = new PipeApp.Views.Terminal()
        terminalView.model = new PipeApp.Models.Terminal()
        $('body').append(terminalView.el)

        terminalView.on('execReady', function() {
          var configurator = new PipeApp.Routers.Configurator()
          Backbone.history.start()
        })

        //@todo - Should modify terminalView.model.attributes.url, not everything is going to be localhost

        terminalView.render()

    }
};

$(document).ready(function () {
    'use strict';
    PipeApp.init();
});
