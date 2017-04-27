var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var CompanyView = function (options, datas){

	console.log("CompanyView")

	this.$navItem = null;
	this.$navItems = null;
	
	this.events = {
		'click': 'onClick',
		'click .all-news-link': 'allNewsClicked'
	}

  PageView.call(this, options, datas);

}

_.extend(CompanyView, PageView);
_.extend(CompanyView.prototype, PageView.prototype);

CompanyView.prototype.initDOM = function(){

	console.log("CompanyView.prototype.initDOM")

	this.$navItem = $(".portfolio");
	this.$navItems	 = this.$el.find('.navigation li a');

	PageView.prototype.initDOM.call(this);

}

CompanyView.prototype.setupDOM = function() {

	PageView.prototype.setupDOM.call(this);
}

CompanyView.prototype.initTLShow = function() {

	PageView.prototype.initTLShow.call(this);
}

CompanyView.prototype.onDOMInit = function() {

	this.showFiltered();
	
	this.setCurrentNavItem();

	PageView.prototype.onDOMInit.call(this);

}

CompanyView.prototype.onShown = function() {

	PageView.prototype.onShown.call(this);
}

CompanyView.prototype.onClick = function() {

}

CompanyView.prototype.setCurrentNavItem = function() {
	
	this.resetCurrentNavItem();
	
	var currentNavItem = this.$navItem;
	currentNavItem.addClass('current');
	
}

CompanyView.prototype.resetCurrentNavItem = function() {
	
	for (var i = 0; i < this.$navItems.length; i++) {

		$(this.$navItems[i]).removeClass('active');
		
	}
}

CompanyView.prototype.showFiltered = function() {

	var filterName = $('.all-news-container').attr('id'),
			className = ' ' + filterName + ' ',
			parent = document.querySelector('.latest-news-section');

  var el = parent.firstChild;
  var count = 0;
  while (el != null) {
    if (el.nodeType == 1) {
      if ((' ' + el.className + ' ').indexOf(className) > -1) {

        $('#latest-news').addClass(filterName);

			  if (count >= 2) {

					$('.all-news-container').addClass(filterName);

					return;

			  }

			  if ($('#latest-news').hasClass(filterName)) {

					$('#latest-news').css("opacity", "1");
					$('#latest-news').css("display", "inline-block");

			  }

        el.style.opacity = '1';
        el.style.display = 'inline-block';

        count++;

      } else {
        el.style.opacity = '0';
        el.style.display = 'none';
      }
    }

    el = el.nextSibling;
  }

}

CompanyView.prototype.allNewsClicked = function() {

	var newsToken = $('.all-news-link').attr('id');

	sessionStorage.newsToken = newsToken;

}

CompanyView.prototype.onResize = function() {

	PageView.prototype.onResize.call(this);
}


CompanyView.prototype.dispose = function() {

	PageView.prototype.dispose.call(this);
}

module.exports = CompanyView;