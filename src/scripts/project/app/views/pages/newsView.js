var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var NewsView = function (options, datas){

	this.$yearFilterButton = null; 
	this.$companyFilterButton = null; 

	this.$yearFilterDrop = null; 
	this.$companyFilterDrop = null; 

	this.$articleContainer = null; 

	this.companyToken = null; 

	this.$companyTagButton = null; 
	this.$newsTile = null; 

	this.isMobile = false;

	console.log("NewsView");
	
	this.events = {
		'click': 'onClick',
		'click .year': 'yearDropdown',
		'click .company': 'companyDropdown',
		'click .company-filter': 'assignCompanyFilterAction',
		'click .year-filter': 'assignYearFilterAction',
		'click .load-more-container': 'loadMoreNews'
	}

  PageView.call(this, options, datas);

}

_.extend(NewsView, PageView);
_.extend(NewsView.prototype, PageView.prototype);

NewsView.prototype.initDOM = function(){

	console.log("NewsView.prototype.initDOM")
	
	this.$companyTagButton = this.$el.find(".company-filter");
	this.$newsTile = this.$el.find(".news-tile");

	this.$yearFilterButton = this.$el.find(".year");
	this.$companyFilterButton = this.$el.find(".company");

	this.$yearFilterDrop = this.$el.find(".year-filter-dropdown");
	this.$companyFilterDrop = this.$el.find(".company-filter-dropdown");

	this.$articleContainer = this.$el.find('.article-container');

	this.companyToken = sessionStorage.newsToken;

	PageView.prototype.initDOM.call(this);

}

NewsView.prototype.setupDOM = function() {

	console.log(this.companyToken);

	this.formatTopTiles('all');

	if ( this.companyToken != undefined) {

		var parent = document.querySelector('.article-container');

		this.companyToken = this.companyToken.split(" ", 1);
		console.log(this.companyToken);

	  $('.no-more-container').css("display", "none");

		$('.first').removeClass('first');
		$('.second').removeClass('second');
		$('.grey').removeClass('grey');
		this.formatTopTiles(this.companyToken);

	  this.showCompanyFilterAction(this.companyToken, this.companyToken, parent, this.companyToken);

	}

	sessionStorage.clear();

	PageView.prototype.setupDOM.call(this);
}

NewsView.prototype.initTLShow = function() {

	PageView.prototype.initTLShow.call(this);
}

NewsView.prototype.onDOMInit = function() {

	PageView.prototype.onDOMInit.call(this);

}

NewsView.prototype.formatTopTiles = function(filter) {

  if (CV.isMobile === false) { 

		this.$firstTile = $('.' + filter)[0];
		this.$firstTile.className += ' first';

		if ($('.' + filter)[1]) {

			this.$secondTile = $('.' + filter)[1];
			this.$secondTile.className += ' second';
			this.$secondTile.className += ' grey';

		}

		this.$greyTiles = $('.' + filter);

		$('.' + filter).each(function(i){
			if( i >= 3 && i % 4 === 0 ) {

				this.$greyTiles = $('.' + filter);
				this.$greyTiles[i].className += ' grey';

			}
		});
	} else {

		this.$firstTile = $('.' + filter)[0];
		this.$firstTile.className += ' first';

		this.$secondTile = $('.' + filter)[1];
		this.$secondTile.className += ' second';
		this.$secondTile.className += ' grey';

		this.$greyTiles = $('.' + filter);

		$('.' + filter).each(function(i){
			if( i >= 3 && i % 2 === 1 ) {

				this.$greyTiles = $('.' + filter);
				this.$greyTiles[i].className += ' grey';

			}
		});

	}

}

NewsView.prototype.formatComplexTopTiles = function(filter1, filter2) {

	// create array and add to it, then pull first two and every fourth

	if (CV.isMobile === false) { 

		$('.' + filter1 + '.' + filter2).each(function (i, obj) {
				
			if (i === 0)	{

				$(obj).addClass('first');
			}	else if (i === 1)	{

				$(obj).addClass('second');
				$(obj).addClass('grey');
			}	else if (i >= 3 && i % 4 === 0) {

				$(obj).addClass('grey');
			}
		});
	} else {

		$('.' + filter1 + '.' + filter2).each(function (i, obj) {
				
			if (i === 0)	{

				$(obj).addClass('first');
			}	else if (i === 1)	{

				$(obj).addClass('second');
				$(obj).addClass('grey');
			}	else if (i >= 3 && i % 2 === 1) {

				$(obj).addClass('grey');
			}
		});

	}

}

NewsView.prototype.assignYearFilterAction = function(e) {

	var filterName = e.target.id,
			className = ' ' + filterName + ' ',
			parent = document.querySelector('.article-container');

	sessionStorage.yearToken = filterName;

  $('.no-more-container').css("display", "none");

	$('.first').removeClass('first');
	$('.second').removeClass('second');
	$('.grey').removeClass('grey');
	this.formatTopTiles(filterName);

	this.showYearFilterAction(filterName, className, parent, filterName);

	this.$companyFilterDrop.css("display", "none");
	this.$yearFilterDrop.css("display", "none");

}

NewsView.prototype.assignCompanyFilterAction = function(e) {

	var filterName = e.target.id,
			className = ' ' + filterName + ' ',
			parent = document.querySelector('.article-container');

	sessionStorage.companyToken = filterName;

  $('.no-more-container').css("display", "none");

	$('.first').removeClass('first');
	$('.second').removeClass('second');
	$('.grey').removeClass('grey');
	this.formatTopTiles(filterName);

	this.showCompanyFilterAction(filterName, className, parent, filterName);

	this.$companyFilterDrop.css("display", "none");
	this.$yearFilterDrop.css("display", "none");

}

NewsView.prototype.showYearFilterAction = function(filterName, className, parent, company) {

  var el = parent.firstChild;
  var count = 0;
  // console.log(el);
  while (el != null) {
    if (el.nodeType == 1) {
      if ((' ' + el.className + ' ').indexOf(className) > -1 && (' ' + el.className + ' ').indexOf(company) > -1) {

				count++;
				
				el.style.position = 'relative';
				el.style.left = '0';

      } else {
				el.style.position = 'absolute';
				el.style.left = '-9999px';
      }
    }

    el = el.nextSibling;
  }

	$('.load-more-container').css("display", "none");

	if (filterName === "all") {

		this.$yearFilterButton.html(filterName + "<div class=\"arrow-down\">");

	} else this.$yearFilterButton.html(filterName.slice(5, 9) + "<div class=\"arrow-down\">");

  if (sessionStorage.companyToken) {

		this.showFilterAction(sessionStorage.yearToken, sessionStorage.yearToken, parent, sessionStorage.companyToken);
		$('.first').removeClass('first');
		$('.second').removeClass('second');
		$('.grey').removeClass('grey');
		this.formatComplexTopTiles(filterName, sessionStorage.companyToken);
		// console.log(sessionStorage.companyToken);

	}

}

NewsView.prototype.showCompanyFilterAction = function(filterName, className, parent, company) {

  var el = parent.firstChild;
  var count = 0;
  // console.log(el);
  while (el != null) {
    if (el.nodeType == 1) {
      if ((' ' + el.className + ' ').indexOf(className) > -1 && (' ' + el.className + ' ').indexOf(company) > -1) {

				count++;
				
				el.style.position = 'relative';
				el.style.left = '0';

      } else {
				el.style.position = 'absolute';
				el.style.left = '-9999px';
      }
    }

    el = el.nextSibling;
  }

	$('.load-more-container').css("display", "none");

	this.$companyFilterButton.html(company + "<div class=\"arrow-down\">");

	if (sessionStorage.yearToken) {

		this.showFilterAction(sessionStorage.yearToken, sessionStorage.yearToken, parent, company);
		$('.first').removeClass('first');
		$('.second').removeClass('second');
		$('.grey').removeClass('grey');
		this.formatComplexTopTiles(filterName, sessionStorage.yearToken);
		// console.log(sessionStorage.yearToken);

	}

}

NewsView.prototype.showFilterAction = function(filterName, className, parent, company) {

  var el = parent.firstChild;
  var count = 0;
  // console.log(el);
  while (el != null) {
    if (el.nodeType == 1) {
      if ((' ' + el.className + ' ').indexOf(className) > -1 && (' ' + el.className + ' ').indexOf(company) > -1) {

				count++;
				
				el.style.position = 'relative';
				el.style.left = '0';

      } else {
				el.style.position = 'absolute';
				el.style.left = '-9999px';
      }
    }

    el = el.nextSibling;
  }

  if (count === 0) {

		$('.no-more-container').css("display", "block");

  }

}

NewsView.prototype.onShown = function() {

	PageView.prototype.onShown.call(this);
}

NewsView.prototype.onClick = function() {

	this.$companyFilterDrop.css("display", "none");
	this.$yearFilterDrop.css("display", "none");

}

NewsView.prototype.yearDropdown = function() {

	this.$companyFilterDrop.css("display", "none");
	this.$yearFilterDrop.css("display", "inline-block");

}

NewsView.prototype.companyDropdown = function() {

	this.$yearFilterDrop.css("display", "none");
	this.$companyFilterDrop.css("display", "inline-block");

}

NewsView.prototype.loadMoreNews = function() {

	$(".news-tile:nth-child(n+5)").css("position", "relative");
	$(".news-tile:nth-child(n+5)").css("left", "inherit");

	$('.load-more-container').css("display", "none");

}

NewsView.prototype.onResize = function() {

	PageView.prototype.onResize.call(this);
}

NewsView.prototype.dispose = function() {

	sessionStorage.clear();

	PageView.prototype.dispose.call(this);
}

module.exports = NewsView;