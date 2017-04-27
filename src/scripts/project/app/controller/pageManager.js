'use strict';

var EVENT               = require('./../events/events'),
    HomeView            = require('./../views/pages/homeView'),
    TeamView            = require('./../views/pages/teamView'),
    TeamMemberView      = require('./../views/pages/teamMemberView'),
    PortfolioView       = require('./../views/pages/portfolioView'),
    CompanyView         = require('./../views/pages/companyView'),
    NewsView            = require('./../views/pages/newsView'),
    ArticleView         = require('./../views/pages/articleView'),
    ContactView         = require('./../views/pages/contactView'),
    LegalView           = require('./../views/pages/legalView'),
    PressView           = require('./../views/pages/pressView'),
    FourOFourView       = require('./../views/pages/fourOFourView'),
    CV                  = require('./../config/currentValues'),
    Analytics           = require('./../tools/analytics');
    
var PageManager = function (){

    /*
    * Instance of Page
    * @type {abstract/controller}
    */

    this.currentPage  = null;

    /*
    * Instance of Page
    * @type {abstract/controller}
    */
    this.oldPage      = null;

    /*
    * object as an associative array
    * @type {Object}
    */
    this.pages = {};

    _.extend(this, Backbone.Events);

}


/*
 * Handles the initialization
 */
PageManager.prototype.init = function() {
  
    _initPages.call(this);

}

/*
 * Entry point to change pages
 * @param {Object} page of the page to navigate to.
 */
PageManager.prototype.navigateTo = function(page,params) {

    var el = null;

    if (this.oldPage == null && this.currentPage == null) {
        el = document.getElementsByClassName('page-wrapper')[0];

        if (el.id == 'app-404') {
            page = '404';
            params = null;
        }
    }

    var newPage = this.getCurrentPage(page, params);

    var filters = null;

    CV.isAnimating = true;

    // console.log('this.oldPage', this.oldPage);
    // console.log('this.currentPage', this.currentPage);

    if(window.location.hash && newPage.id === "projects"){
        filters = _parseProjectFilters.call(this, window.location.hash );
    }

    if (this.currentPage) {
        
        this.oldPage = this.currentPage;

    }

    CV.currentPage = newPage.id;

    this.currentPage = new newPage.view({
        slug:params,
        el : this.currentPage ? null : el,
        filters : filters === null ? null : filters
    },{});

    this.listenToOnce( this.currentPage, EVENT.PAGE_RENDERED , _onPageRendered.bind(this));
    this.currentPage.initializeRender();
    
}

PageManager.prototype.getCurrentPage = function(page, params){
        
    if (page == null)
        page = 'index';

    switch(page) {

        case 'index': 
            return {id:'index',view : HomeView};
            break;

        case 'team':
            return (params != null) ? {id:'team-member',view : TeamMemberView} : {id:'team',view : TeamView};
            break;

        case 'portfolio':
            return (params != null) ? {id:'company',view : CompanyView} : {id:'portfolio',view : PortfolioView};
            break;
        case 'news':
            return (params != null) ? {id:'article',view : ArticleView} : {id:'news',view : NewsView};
            break;

        case 'contact':
            return {id:'contact',view : ContactView};
            break;

        case 'legal':
            return {id:'legal',view : LegalView};
            break;

        case 'press':
            return {id:'press',view : PressView};
            break;

        case '404': default:
            return {id:'four-o-four',view : FourOFourView};
    }

}

PageManager.prototype.onError = function(){

    Backbone.history.navigate('404', {trigger: false});
    this.navigateTo('404');

}

var _parseProjectFilters = function (url) {
    
    if(url.substring(0, 9) == "#show-me:"){

        if(url.length === 9 ) return null;
        
        return url.replace("#show-me:","").split("+");
    }else{
        return null;
    }

}


var _onPageRendered = function () {

    //JS rendered here 
    if(this.oldPage != null){
        this.trigger(EVENT.PAGE_RENDERED);
    }

    document.title =  'Apple Tree Partners' + ((this.currentPage.model.get('metaTitle')) ?  ' - ' + this.currentPage.model.get('metaTitle') : '');

    // // Analytics
    // Analytics.page({
    //     page: window.location.pathname,
    //     title: document.title
    // })

    this.listenToOnce( this.currentPage, EVENT.INIT , _onPageReady.bind(this));
    this.currentPage.init();
    
    document.body.setAttribute("data-currentpage", CV.currentPage );
}

var _onPageReady = function () {

    this.stopListening( this.currentPage, EVENT.INIT);

    var direct;

    if (this.oldPage) {
        
        this.trigger(EVENT.HIDE_PAGE)
        this.listenToOnce( this.oldPage, EVENT.HIDDEN , _onPageHidden.bind(this));
        this.oldPage.hide();

    } else {
        
        //first page
        //direct Show
        this.trigger(EVENT.SHOW_PAGE)
        this.listenToOnce( this.currentPage, EVENT.SHOWN , _onPageShown.bind(this));
        this.currentPage.show(true);
    }
    
}

var _onPageHidden = function () {

    //console.log('pageManager _onPageHidden')
    this.listenToOnce(this.currentPage, EVENT.SHOWN , _onPageShown.bind(this));
    this.listenToOnce(this.currentPage, EVENT.HIDE_TILE_TRANSITION, _onHideTileTransition.bind(this));

    // dispose now!
    if (this.oldPage){
        _removeOldPage.call(this);
    } 

    //here we hide old page so it's not direct
    //we appended the new page on the DOM
    setTimeout( (function(){
        
        this.trigger(EVENT.SHOW_PAGE)
        this.currentPage.show(false);

    }).bind(this), 0 )
    
}


var _onPageShown = function () {

    this.listenToOnce(this.currentPage, EVENT.SHOW_TILE_TRANSITION, _onShowTileTransition.bind(this));
    this.listenTo(this.currentPage, EVENT.RELAYOUT, _onRelayout.bind(this));

    //console.log('_onPageShown');

    CV.isAnimating = false;
    CV.firstTime = false;

    this.trigger(EVENT.PAGE_SHOWN);

}

var _onShowTileTransition = function(e) {
    this.trigger(EVENT.SHOW_TILE_TRANSITION, {conf: e.conf});
}

var _onHideTileTransition = function(e) {
    this.trigger(EVENT.HIDE_TILE_TRANSITION);
}

var _onRelayout = function() {
    this.trigger(EVENT.RELAYOUT);
}

var _removeOldPage = function  () {

    if (this.oldPage) {

        this.stopListening( this.oldPage, EVENT.HIDDEN);
        this.stopListening( this.oldPage, EVENT.SHOWN);
        this.stopListening( this.oldPage, EVENT.SHOW_TILE_TRANSITION);
        this.stopListening( this.oldPage, EVENT.HIDE_TILE_TRANSITION);
        this.stopListening( this.oldPage, EVENT.RELAYOUT);

        this.oldPage.dispose();
    }

    this.oldPage = null;

}


module.exports = PageManager;