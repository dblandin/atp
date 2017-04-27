var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var PortfolioView = function (options, datas){

	this.$sections = null;
	this.$collapseWrappers = null;
	
	this.events = {
		'click .expertise-section': 'onClick'
	}

  PageView.call(this, options, datas);

}

_.extend(PortfolioView, PageView);
_.extend(PortfolioView.prototype, PageView.prototype);

PortfolioView.prototype.initDOM = function(){

	this.$sections = this.$el.find('.expertise-section');

	PageView.prototype.initDOM.call(this);

}

PortfolioView.prototype.onClick = function(e) {

	if (CV.breakpoint === "default") return;

	var currentSection = e.currentTarget;

	if (currentSection.classList.contains('active')) {

		currentSection.classList.remove('active');
		
	} else {

		for (var i = 0; i < this.$sections.length; i++) {
			this.$sections[i].classList.remove('active');
		}

		currentSection.classList.add('active');
	}
}

module.exports = PortfolioView;