'use strict';

var EVENT                     = require('./../events/events');
var pageManager               = require('./../controller/pageManager');
var CV                        = require('./../config/currentValues');
var Config                    = require('./../config/config');
var HeaderView                = require('./main/views/headerView');
var FooterView                = require('./main/views/footerView');
var Tools                     = require('./../tools/tools');

/**
 * MainView: Handles the main view logic - window/document event
 * @extend {abstract/view/DOM/DOMview}
 * @constructor
 */
var MainView = function (options, datas){

  this.el     = document.body;

  this.$el    = $(this.el);

  this.idView = 'mainpage';

  this.navColor = null;

  /*
   * Instance of Transition Gradient View
   */
  this.transitionGradientView = null;

  /*
   * Instance of Btn Menu View
   * @type {page/main/views/menu/btnMenuView}
   */
  this.headerView = null;

  /*
   * Instance of Global Footer View
   * @type {page/main/views/menu/btnMenuView}
   */
  this.footerView = null;

  /**
   * Meta viewport element
   * @type {element}
   * @private
   */
  this.metaViewport = null;

  /**
   * Main container
   * @type {jQuery element}
   * @private
   */
  this.$container = null;

  /**
   * html element
   * @type {jQuery element}
   * @private
   */
  this.$html = null;

  /**
   * body element
   * @type {jQuery element}
   * @private
   */
  this.$body = null;

  /**
   * body element
   * @type {jQuery element}
   * @private
   */
  this.$overlayMobile = null;

  /**
   * block the mouse event from anywhere
   * @type {boolean}
   */
  this.blockMouseEvent = false;

  /**
   * Usefull for touchMove: should we block the scroll or not?
   * @type {boolean}
   */
  this.canMove = true;

  /**
   * Usefull for touchMove: should we block the scroll or not?
   * @type {boolean}
   */
  this.itsSettled = false;

  /**
   * Reference to the RAF function
   * @type {function}
   */
  this.RAFFnc = null;

  this.pageManager = null;

  // this.events = {
  //   'click #header .logo': 'onLogoClick'
  // }

  // this.events = {
  //   'click nav a': 'onLinkClicked',
  //   'click .logo a': 'onLinkClicked',
  //   'click .side-logo a': 'onLinkClicked'
  // }

  this.handlers = {};
  this.ticketScroll = false;

  Backbone.View.call(this, options, datas);

};

_.extend(MainView, Backbone.View);
_.extend(MainView.prototype, Backbone.View.prototype);


/**
 * @override
 */
MainView.prototype.initialize = function() {

  _onResize.call(this);

  this.bindMainEvents();

}

MainView.prototype.init = function() {

  if(CV.isMobile){

      $("body").addClass('isMobile');
      //FastClick.attach(this.el);

  }

  if(CV.isTablet){

      $("body").addClass('isTablet');
      //FastClick.attach(this.el);

  }
  
  this.pageManager = new pageManager();
  this.listenTo(this.pageManager, EVENT.PAGE_RENDERED , _appendPage.bind(this));
  this.listenTo(this.pageManager, EVENT.SHOW_PAGE ,     _onShowPage.bind(this));
  this.listenTo(this.pageManager, EVENT.PAGE_SHOWN ,    _onPageShown.bind(this));
  this.listenTo(this.pageManager, EVENT.HIDE_PAGE ,     _onHidePage.bind(this));
  this.listenTo(this.pageManager, EVENT.RELAYOUT ,     _onRelayout.bind(this));

  this.headerView = new HeaderView({el: this.$el.find('#header')[0]});
  this.headerView.init();

  this.footerView = new FooterView({el: this.$el.find('#footer')[0]});
  this.footerView.init();

  this.handlers.onUpdate = _onUpdate.bind(this);

  _onResize.call(this);
  _onUpdate.call(this);

  this.trigger(EVENT.INIT);

}

var _onShowPage = function() {
  
  if( this.footerView ){
    // this.footerView.setFooterCarousel();
    this.footerView.onResize();
    this.footerView.show();
  }

  if( this.headerView ){ 

    this.headerView.onResize();
    this.headerView.show();
  }

}

var _onHidePage = function() {
  
  if( this.footerView ){ 
    this.footerView.hide();
  }

  if( this.headerView ){ 
    this.headerView.hide();
  }

}

var _onPageShown = function(){


  // if( this.footerView ){ 
  //   this.footerView.onResize();
  //   this.footerView.show();
  // }

  // if( this.headerView ){ 
  //   this.headerView.onResize();
  //   this.headerView.show();
  // }

  // in case too

}

var _onRelayout = function() {
  
}

// MainView.prototype.onLinkClicked = function(e) {
//   e.preventDefault();
//   CV.navigate(e.currentTarget.href);
// }


/**
 * Bind all the main window/document event here.
 */
MainView.prototype.bindMainEvents = function() {

  this.$html = $('html');
  this.$container = $('#content');
  this.$body = $('body');

  window.addEventListener("resize", _.throttle(_onResize.bind(this), 300) , false);
  window.addEventListener('scroll', _onScroll.bind(this), false);
  document.addEventListener("keydown", $.proxy(_onKeyDown, this), false);

  // document.addEventListener("mouseout",  $.proxy(_onMouseOut, this), false);
  // this.$body[0].addEventListener("mousemove",  $.proxy(_onMouseMove, this), false);
  // this.$body[0].addEventListener("mousedown",  $.proxy(_onMouseDown, this), false);
  // this.$body[0].addEventListener("mouseup",  $.proxy(_onMouseUp, this), false);

  //this.$body[0].addEventListener("touchstart",  $.proxy(_onTouchStart, this), false);
  //this.$body[0].addEventListener("touchmove",   $.proxy(_onTouchMove, this), false);
  //this.$body[0].addEventListener("touchend",    $.proxy(_onTouchEnd, this), false);
  
}

MainView.prototype.setCurrentPage = function() {
  
}

var _onScroll = function() {
  this.ticketScroll = true;
}


var _onUpdate = function(){

  if( this.ticketScroll ){

    this.ticketScroll = false;

    var scrollY =  window.scrollY || window.pageYOffset; 

    if (scrollY < CV.scrollY) {
      CV.scrollYDirection = "up";
    } else {
      CV.scrollYDirection = "down";
    }

    CV.scrollY = scrollY;

  }
  
  if( this.pageManager && this.pageManager.currentPage && this.pageManager.currentPage.canUpdate) this.pageManager.currentPage.onUpdate();

  this.headerView.onUpdate();
  this.footerView.onUpdate();

  if (this.transitionGradientView != null)
    this.transitionGradientView.update(); // not onUpdate because it has to run only during an animation

  window.requestAnimationFrame(this.handlers.onUpdate);
}

var _onResize = function(){

  CV.viewport.width = CV.viewport.wrapperWidth = $(document).width();
  CV.viewport.height = $(window).height();

  CV.breakpoint = (CV.viewport.width <= 922 ) ? "sml" : "default";

  if (CV.viewport.width >= 1600)
    CV.viewport.wrapperWidth = 1600;

  if( this.pageManager && this.pageManager.currentPage) this.pageManager.currentPage.onResize();

  if( this.headerView ){ 
    this.headerView.onResize();
  }

  if( this.footerView ){ 
    this.footerView.onResize();
  }

}

var _onKeyDown = function(e){
    if( this.pageManager && this.pageManager.currentPage) this.pageManager.currentPage.onKeyDown(e);
}

var _appendPage = function(){

  this.$container.append(this.pageManager.currentPage.el);

}



module.exports = new MainView();