var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var TeamView = function (options, datas){

	this.$sections = null;
	this.$collapseWrappers = null;
	
	this.events = {
		'click .team-section': 'onClick'
	}

  PageView.call(this, options, datas);

}

_.extend(TeamView, PageView);
_.extend(TeamView.prototype, PageView.prototype);

TeamView.prototype.initDOM = function(){

	this.$sections = this.$el.find('.team-section');

	PageView.prototype.initDOM.call(this);

}

TeamView.prototype.onClick = function(e) {

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

module.exports = TeamView;