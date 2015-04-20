/*global PipeApp, $*/


window.PipeApp = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
        var terminalView = new PipeApp.Views.Terminal()
        terminalView.model = new PipeApp.Models.Terminal()
        //@todo - Should modify terminalView.model.attributes.url
        terminalView.render()
        $('body').append(terminalView.el)
        var configurator = new PipeApp.Routers.Configurator()
        Backbone.history.start()
    }
};

$(document).ready(function () {
    'use strict';
    PipeApp.init();
});
