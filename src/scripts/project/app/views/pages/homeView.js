var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');
var PartnershipCarouselView  	= require('./../../components/carouselView');

var HomeView = function (options, datas){

	this.$partnershipCarouselEl = null;
	this.partnershipCarousel = null;

	this.$blurb = null;
	this.$outline = null;

	this.ticketScroll = false;
	this.canUpdate = false;

	this.TL = {};

	this.isMobile = false;

	this.events = {
		'click': 'onClick'
	}

	this.handlers = {

	};

	PageView.call(this, options, datas);

}

_.extend(HomeView, PageView);
_.extend(HomeView.prototype, PageView.prototype);

HomeView.prototype.initDOM = function(){

	this.$partnershipCarouselEl = this.$el.find('.partnership-carousel');

	this.$blurb = this.$el.find(".blurb-container>p");

	this.$blurbHeight = document.querySelector(".blurb-container>p");
	this.$outline = document.querySelector(".outline");

	PageView.prototype.initDOM.call(this);
}

HomeView.prototype.onDOMInit = function() {

	this.$outline.style.height = this.$blurbHeight.clientHeight + "px";

  if (CV.isMobile === true) {

		this.$outline.style.top = this.$blurb.offset().top + 31 + "px";
		this.$outline.style.left = this.$blurb.offset().top + "px";

	}

	this.partnershipCarousel = new PartnershipCarouselView({el:this.$partnershipCarouselEl, hasTimer:true}, null);
	this.partnershipCarousel.init();

	this.canUpdate = true;

	PageView.prototype.onDOMInit.call(this);

}

HomeView.prototype.onShown = function() {

  this.TL.show = new TimelineMax({paused: true});

  this.TL.show.to(this.$outline, 0.5, {opacity:1, ease: Power1.easeInOut}, '+=0.6');
  this.TL.show.to(this.$blurb, 0.5, {opacity:1, ease: Power1.easeInOut}, '-=0.5');

  if (CV.isMobile === false) {
		this.TL.show.to(this.$outline, 0.25, {x:"15", y:"15", ease: Power0.easeInOut}, '+=0.2');
		this.TL.show.to(this.$blurb, 0.25, {x:"-15", y:"-15", ease: Power0.easeInOut}, '-=0.25');
  }

  this.TL.show.play();

	PageView.prototype.onShown.call(this);
}

HomeView.prototype.onResize = function() {

	this.$outline.style.height = this.$blurbHeight.clientHeight + "px";

	PageView.prototype.onResize.call(this);
}


HomeView.prototype.dispose = function() {

	this.$outline.dispose();
	this.$blurb = null;
	this.$outline = null;

  this.TL = {};

	this.partnershipCarousel.dispose();
	this.partnershipCarousel = null;
	this.$partnershipCarouselEl = null;

	PageView.prototype.dispose.call(this);
}

module.exports = HomeView;
