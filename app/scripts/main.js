/*global PipeApp, $*/


window.PipeApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict'

        PipeApp.deviceCmd = new PipeApp.Models.Cmd()
        PipeApp.databaseCmd = new PipeApp.Models.Cmd()
        PipeApp.terminalView = new PipeApp.Views.Terminal()
        PipeApp.terminalView.model = new PipeApp.Models.Terminal()

        $('body').append(PipeApp.terminalView.el)

        PipeApp.terminalView.on('execReady', function() {
          var configurator = new PipeApp.Routers.Configurator()
          Backbone.history.start()
        })

        //@todo - Should modify terminalView.model.attributes.url, not everything is going to be localhost

        PipeApp.terminalView.render()

    }
};

$(document).ready(function () {
    'use strict';
    PipeApp.init();
});
