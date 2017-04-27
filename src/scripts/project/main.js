'use strict';

//this doesn't work
// if( ENV.prod === 0) {
//     // add live reload:
//     $('body').append('<script src="http://localhost:9091"></script>');
//     console.log('----- Init Main, running in DEV-----');
// }

Backbone.$ = $;
var App = require('./app/app');

/**
 * Main module - App entry point
 * @module Main
 */

var Main = function(){};

/**
 * Callback fired once the document is ready
 * @public
 */
Main.prototype.onReady = function() {
	
  var app = new App();
  app.init();

}

var main = module.exports = new Main();
$(document).ready(main.onReady.bind(main));