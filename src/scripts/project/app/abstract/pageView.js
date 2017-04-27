var EVENT   						= require('./../events/events');
var CV 								= require('./../config/currentValues');
var BaseView      					= require('./baseView');
var gsap 							= require('gsap');
var LazyLoad						= require('lazy');
var ScrollToPlugin 					= require('gsap/src/uncompressed/plugins/ScrollToPlugin');

var PageView = function (options, data){

	/**
	* Model
	* @type {Backbone Model}
	*/
	this.model = (this.model != undefined) ? this.model : new Backbone.Model({asynchronous:false});

	/* 
	* Check if the view has lazy loading enabled
	*/
	this.hasLazyLoading = false;

	this.$lazyLoadElements

	/* 
	* Lazy instance
	*/
	this.lazy = null;

	this.$lazyImages = null;
	this.$lazyVideos = null;
	this.$lazyIframe = null;

	BaseView.call(this, options, data);

};

_.extend(PageView, BaseView);
_.extend(PageView.prototype, BaseView.prototype);

PageView.prototype.initialize = function(options, data) {

	//Checking if data passed as attributes and merging them with model attributes
	var data = (data != undefined) ? data : null; //put in a page property to match the templating data style
	if(data != null) this.model.set(data);

	BaseView.prototype.initialize.call(this, options, data);

}

PageView.prototype.initializeRender = function() {

	//Asyncronous rendering checking
	//We check if we are on the server ( and data are here ) or if we need to fecth model before render
	if( this.model.get('asyncronous') === true ){

		this.model.fetch({
			success: this.render.bind(this)
		});

	}else{

		this.render();
	}

}

/**
 * @override
 * Handles the rendering. 
 * If this.id is provided, it tries to get the element from the DOM
 * If not, it generates the element based on the tempalte provided, and append it to the container
 */

PageView.prototype.renderTemplate = function() {

	var html = this.template(this.model.attributes);
	this.setElement(html);

}

/**
 * Add a view based on a model
 * No need to store or anything because it's part of a collection
 */
PageView.prototype.addOne = function(model,el,view,className) {

	if(el!= null) el = el[0];
	var subView = new view({ model : model , el : el , className : className });
	subView.init();
	return (subView);

}

/**
 * Handles the initialization of DOM element
 * Here we should create reference of DOM elements we want to manipulate
 */

PageView.prototype.initDOM = function() {

	window.scrollTo(0, 0);

	this.$lazyLoadElements = document.querySelectorAll('.lazyLoad');
	
	if (this.$lazyLoadElements && this.$lazyLoadElements.length >= 0) {

		this.hasLazyLoading = true;
		
	}

	BaseView.prototype.initDOM.call(this);

}

PageView.prototype.onDOMInit = function() {
	
	this.onResize();
	
	BaseView.prototype.onDOMInit.call(this);

}


PageView.prototype.setupDOM = function() {

	//scrolltop

	TweenLite.set(this.$el, {autoAlpha:1});
}

PageView.prototype.initTL = function() {

	this.initTLShow();
	this.initTLHide();

}

PageView.prototype.initTLShow = function() {

	this.TL.show = new TimelineMax({paused:true, onComplete:this.onShown.bind(this)});
	this.TL.show.to(this.$el, 0.3, {autoAlpha:1 , ease : Cubic.easeInOut}, 0);

}

PageView.prototype.initTLHide = function() {

	this.TL.hide = new TimelineMax({paused: true, onComplete: this.onHidden.bind(this)});
	this.TL.hide.to(this.$el, 0.3, {autoAlpha:0 ,  ease : Expo.easeInOut}, 0);

}

/**
 * Bind events
 */
PageView.prototype.bindEvents = function() {

	BaseView.prototype.bindEvents.call(this);

}

PageView.prototype.initLazyLoading = function (){

	if (!this.hasLazyLoading) return;

	this.lazy = new LazyLoad({elements: document.querySelectorAll('.lazyLoad')});

	this.lazy.el.addEventListener(LazyLoad.EVENT.ELEMENT_LOADED, _onElementLoaded.bind(this));
	this.lazy.el.addEventListener(LazyLoad.EVENT.COMPLETE, _onLazyLoaded.bind(this));

	this.lazy.init();
}

var _onElementLoaded = function(e) {
	//console.log('_onElementLoaded', e);
}

var _onLazyLoaded = function(e) {
	//console.log('_onLazyLoaded');
}

PageView.prototype.show = function (direct){

	this.TL.show.play();
}

PageView.prototype.onShown = function (){

	if (this.$lazyLoadElements && this.$lazyLoadElements.length >= 0) {

		this.initLazyLoading();

	}

	BaseView.prototype.onShown.call(this);

}

PageView.prototype.onHidden = function (){

	BaseView.prototype.onHidden.call(this);
}

PageView.prototype.hide = function (direct){

	// No need to replay the timeline, just trigger the hidden event
	if (!this.isShown){
		this.trigger(EVENT.HIDDEN);
		return;
	}

	this.TL.hide.play(0);
}

PageView.prototype.onResize = function() {


}

PageView.prototype.onKeyDown = function(e) {	 

}

PageView.prototype.dispose = function() {

	if (this.lazy != null)
		this.lazy.dispose();

	if (this.model != null)
		this.model.stopListening();

	this.model = null;
	this.handlers = null;
	this.lazy = null;

	BaseView.prototype.dispose.call(this);
}


module.exports = PageView;