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
        terminalView.render()
        $('body').append(terminalView.el)
    }
};

$(document).ready(function () {
    'use strict';
    PipeApp.init();
});
