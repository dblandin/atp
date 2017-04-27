'use strict';

require('underscore');
require('Detectizr');

var Router   	  = require('./router/router');
var Config    	= require('./config/config');
var Analytics   = require('./tools/analytics');

/**
 * app: Init the app
 * @constructor
 */
var App = function (){

  _.extend(this, Backbone.Events);

};

/**
 * Handles the init
 */
App.prototype.init = function(){
  
  console.log('**** Begin App ****');

  Config.init();
  //Analytics.init();
  Router.init();
  
}

module.exports = App;