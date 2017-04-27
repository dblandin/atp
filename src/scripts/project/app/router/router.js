'use strict';

var EVENT       = require('./../events/events');
var MainView    = require('./../views/mainView');

var Router = function(){

    this.routes = {
        ':page/:params':'default',
        ':page/:params/':'default',
        ':page':'default',
        ':page/':'default',
        '':'default'
    };

    this.history = [];

    this.mainView = MainView;

    Backbone.Router.call(this);

};

_.extend(Router, Backbone.Router);
_.extend(Router.prototype, Backbone.Router.prototype);

Router.prototype.init = function() {

    this.listenToOnce(this.mainView, EVENT.INIT, _onMainViewInit.bind(this))
    this.mainView.init();

    // // TODO: debug, remove for prod!
    window['MAIN'] = this.mainView;

}

var _onMainViewInit = function() {

    Backbone.history.start({
        pushState: true
    });

}

Router.prototype.default = function(page_, params_, filters_){
    
    //here means there is a get parameters
    if(Backbone.history.location.search){

        if(page_ === Backbone.history.location.search.replace( '?', "")) page_ = null;
        if(params_ === Backbone.history.location.search.replace( '?', "")) params_ = null;
        if(filters_ === Backbone.history.location.search.replace( '?', "")) filters_ = null;

    }

    // ADD EVENT OR CALL TO UDPATE MENU/FOOTER HERE IF NEEDED
    // App.mainView.topMenu.setCurrentPage(page,params);
    // App.mainView.bottomMenu.setCurrentPage(page,params);
    var page    = (page_ != undefined) ? page_ : null;
    var params  = (params_ != undefined) ? params_ : null;
    var filters = (filters_ != undefined) ? filters_ : null;
    
    this.mainView.pageManager.navigateTo(page, params, filters);

    this.history.push(page);


}


Router.prototype.current_page = function(){

    return _.last(this.history);

}

Router.prototype.back = function(){

    Backbone.history.navigate(this.previous_page(), {trigger: false});

}

Router.prototype.previous_page = function(){
    
    if (this.history.length <= 1) return null
    else return this.history[this.history.length-2];

}


module.exports = new Router();