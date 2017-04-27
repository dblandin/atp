var EVENT   		= require('./../../../events/events');
var CV      		= require('./../../../config/currentValues');
var Config      	= require('./../../../config/config');
var BaseView    	= require('./../../../abstract/baseView');
var Analytics   	= require('./../../../tools/analytics');

var HeaderView = function (options, datas){

	this.$header = null;
	this.$headerMenu = null;
	this.$links = null;
	this.$linksList = null;
	this.$mobileMenu = null;
	this.$mobileMenuCopy = null;
	this.$navigation = null;

	this.$navItems = null;
	this.$navLogo = null;
	this.$navLogoWhite = null;

	this.lastScrollY = 0;
	this.isScrolling = false;
	this.isMenuOpened = false;

	this.$heroSection = null;

	this.isMobile = false;

	this.events = {
		'click .menu': 'revealMenu'
	}

	BaseView.call(this, options, datas);

};

_.extend(HeaderView, BaseView);
_.extend(HeaderView.prototype, BaseView.prototype);


/**
 * Handles the initialization of DOM element
 * Here we should create reference of DOM elements we want to manipulate
 */

HeaderView.prototype.initDOM = function() {

	this.$header = document.getElementById("header");
	this.$links = $(".header-link");
	this.$linksList = $(".navigation.li");

	this.$headerMenu = $("header");
	this.$mobileMenu = $(".menu");
	this.$mobileMenuCopy = $(".menu-copy");
	this.$navigation = $(".navigation");
	this.$navItems	 = this.$el.find('.navigation li a');

	this.$navLogo = $(".default");
	this.$navLogoWhite = $(".white");

	BaseView.prototype.initDOM.call(this);

}

/**
 * After the DOM is fully init
 */
HeaderView.prototype.onDOMInit = function() {

	if( CV.currentPage === "index" ) {

		this.$headerMenu.css("opacity", "0");

		this.$headerMenu.css("background-color", "transparent");
		this.$headerMenu.css("border-bottom", "none");

		this.$mobileMenu.css('color', '#000000');
		this.$mobileMenu.css('fill', '#ffffff');

	} else this.$headerMenu.css("background-color", "#ffffff");

	this.setCurrentNavItem();

  BaseView.prototype.onDOMInit.call(this);

}

HeaderView.prototype.setupDOM = function() {

	if( CV.currentPage === "index" ) {

		this.$heroSection = document.querySelector(".hero-section");
		this.$heroSection.style.zIndex = 	"5";

		this.$headerMenu.css("opacity", "1");

	}

	this.setNavLayout();

}

HeaderView.prototype.initTL = function() {


}

HeaderView.prototype.show = function() {


}

HeaderView.prototype.hide = function() {

	setTimeout( (function(){
		this.TL.hide.play(0);
	}).bind(this), 0 )

}


HeaderView.prototype.bindEvents = function() {

	BaseView.prototype.bindEvents.call(this);

}

HeaderView.prototype.setNavLayout = function() {

	switch(CV.currentPage) {

		case "team":
			this.setCurrentNavItem();
			break;

	  case "portfolio":
			this.setCurrentNavItem();
			break;

		case "news":
			this.setCurrentNavItem();
			break;

		case "contact":
			this.setCurrentNavItem();
			break;

		default:
			this.resetCurrentNavItem();
	}

}

HeaderView.prototype.setCurrentNavItem = function() {

	this.resetCurrentNavItem();

	var currentNavItem = this.$navigation.find("[data-page='" + CV.currentPage + "']");
	currentNavItem.addClass('active');

}

HeaderView.prototype.resetCurrentNavItem = function() {

	for (var i = 0; i < this.$navItems.length; i++) {

		$(this.$navItems[i]).removeClass('active');

	}
}

HeaderView.prototype.revealMenu = function() {

	if ( this.$headerMenu.hasClass('active') ) {

		this.$navigation.removeClass('active');
		this.$headerMenu.removeClass('active');

		this.$headerMenu.css("background-color", "#ffffff");

		this.$mobileMenu.css('fill', '#000000');
		this.$mobileMenuCopy.css('border-bottom', '1px dotted #000000');
		this.$mobileMenuCopy.css('color', '#000000');
		this.$mobileMenuCopy.html(' ');

		this.isMenuOpened = false;

	} else {

		this.$navigation.addClass('active');
		this.$headerMenu.addClass('active');

		this.$headerMenu.css("background-color", "#000000");

		this.$mobileMenu.css('fill', '#ffffff');
		this.$mobileMenuCopy.css('border-bottom', '1px dotted #ffffff');
		this.$mobileMenuCopy.css('color', '#ffffff');
		this.$mobileMenuCopy.html('Close');

		this.isMenuOpened = true;
	}
}

HeaderView.prototype.onResize = function() {

}

/*
 * Don't think we ever unbind the navigation...
 * but just in case.
 */
HeaderView.prototype.unbindEvents = function() {

	BaseView.prototype.unbindEvents.call(this);
}

/**
 * Called on request animation frame
 */

HeaderView.prototype.onUpdate = function() {

	if (!this.isInit) return;

	if (this.lastScrollY != CV.scrollY) {
		this.diffY = Math.abs(CV.scrollY - this.lastScrollY);
		this.lastScrollY = CV.scrollY;
		this.isScrolling = true;
	} else {
		this.isScrolling = false;
	}

	if (!this.isScrolling) return;

	_onScroll.call(this);

}

var _onScroll = function() {

	if (this.isMenuOpened) return;

	if ( CV.currentPage === "index" ) {

		if ( $(window).scrollTop() > 0 ) {

			this.$headerMenu.addClass("small");

			this.$headerMenu.css("background-color", "#fafafa");
			this.$headerMenu.css("border-bottom", "5px solid #d51428");
			this.$mobileMenu.css('color', '#000000');
			this.$mobileMenu.css('fill', '#000000');

			if ( CV.isMobile === false ) {

				this.$links.css('color', '#2e2e2e');

			}

		} else {

			this.$headerMenu.removeClass("small");
			this.$headerMenu.css("background-color", "transparent");
			this.$headerMenu.css("border-bottom", "none");
			this.$mobileMenu.css('color', '#ffffff');
			this.$mobileMenu.css('fill', '#ffffff');

		}
	} else {

		if ( $(window).scrollTop() > 0 && CV.isMobile === false ) {

			this.$headerMenu.addClass("small");

		} else {

			this.$headerMenu.removeClass("small");

		}

	}

}

module.exports = HeaderView;
