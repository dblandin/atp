var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var ArticleView = function (options, datas){
	
	this.events = {
		'click .facebook ': 'onFacebookClicked',
		'click .twitter ': 'onTwitterClicked',
		'click .linkedin': 'onLinkedinClicked',
		'click .all-news-link': 'allNewsClicked'
	}

	this.popupWidth = 575;
	this.popupHeight = 350;
	this.leftMargin = null;
	this.topMargin = null;

	this.$navItem = null;
	this.$navItems = null;

	this.url = null;

	this.title = null;
	this.description = null;
	this.twitterDescription = null;

  PageView.call(this, options, datas);

}

_.extend(ArticleView, PageView);
_.extend(ArticleView.prototype, PageView.prototype);

ArticleView.prototype.initDOM = function(){

	this.leftMargin = (CV.viewport.width/2)-(this.popupWidth/2);
	this.topMargin = (CV.viewport.height/2)-(this.popupHeight/2);

	this.$navItem = $(".news");
	this.$navItems	 = this.$el.find('.navigation li a');

	this.url = window.location.href;

	this.title = document.querySelector("meta[property='og:title']").getAttribute('content');
	this.description = document.querySelector("meta[property='og:description']").getAttribute('content');
	this.twitterDescription = document.querySelector("meta[name='twitter:description']").getAttribute('content');

	PageView.prototype.initDOM.call(this);

}

ArticleView.prototype.onDOMInit = function() {

	this.showFiltered();
	
	this.setCurrentNavItem();
	
	PageView.prototype.onDOMInit.call(this);

}

ArticleView.prototype.onFacebookClicked = function() {
	
	window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.url) + "&title=" + encodeURIComponent(this.title) + '&description=' + encodeURIComponent(this.description) + "&redirect_uri=" + encodeURIComponent(this.url), '_blank', 'height='+this.popupHeight+',width='+this.popupWidth+',top='+this.topMargin+',left='+this.leftMargin);
	$(".st0").css("fill", "#B2B2B2");
}

ArticleView.prototype.onTwitterClicked = function() {
		
	window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.twitterDescription), '_blank', 'height='+this.popupHeight+',width='+this.popupWidth+',top='+this.topMargin+',left='+this.leftMargin);
	$(".st0").css("fill", "#B2B2B2");
}

ArticleView.prototype.onLinkedinClicked = function() {

	window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(this.url) + '&title=' + encodeURIComponent(this.title) + '&summary=' + encodeURIComponent(this.description), '_blank', 'height='+this.popupHeight+',width='+this.popupWidth+',top='+this.topMargin+',left='+this.leftMargin);
	$(".st0").css("fill", "#B2B2B2");
}

ArticleView.prototype.setCurrentNavItem = function() {
	
	this.resetCurrentNavItem();
	
	var currentNavItem = this.$navItem;
	currentNavItem.addClass('current');
	
}

ArticleView.prototype.resetCurrentNavItem = function() {
	
	for (var i = 0; i < this.$navItems.length; i++) {

		$(this.$navItems[i]).removeClass('active');
		
	}
}

ArticleView.prototype.allNewsClicked = function() {

	var newsToken = $('.all-news-link').attr('id');

	console.log(newsToken);

	sessionStorage.newsToken = newsToken;

}

ArticleView.prototype.showFiltered = function() {

	var filterName = $('.latest-news-section').attr('id'),
			className = ' ' + filterName + ' ',
			parent = document.querySelector('.latest-news-section');

	console.log(filterName, className, parent);

  var el = parent.firstChild;
  // console.log(el);
  while (el != null) {
    if (el.nodeType == 1) {
      if ((' ' + el.className + ' ').indexOf(className) > -1) {
        el.style.opacity = '0';
        el.style.display = 'none';
      } else {
				el.style.opacity = '1';
        el.style.display = 'inline-block';
      }
    }

    if ( $('.news-tile:nth-child(2)').css('display') === 'none' ) {

			$('.news-tile:nth-child(n+5)').css('display', 'none');	

    } else if ( $('.news-tile:nth-child(3)').css('display') === 'none' ) {

			$('.news-tile:nth-child(n+5)').css('display', 'none');	

    } else $('.news-tile:nth-child(n+4)').css('display', 'none');

    el = el.nextSibling;
  }

}

ArticleView.prototype.dispose = function() {

	PageView.prototype.dispose.call(this);
}

module.exports = ArticleView;