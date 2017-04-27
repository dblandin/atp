var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var TeamMemberView = function (options, datas){

	this.$memberBoard = null;

	this.$navItem = null;
	this.$navItems = null;

	console.log("TeamMemberView")
	
	this.events = {
		'click': 'onClick'
	}

  PageView.call(this, options, datas);

}

_.extend(TeamMemberView, PageView);
_.extend(TeamMemberView.prototype, PageView.prototype);

TeamMemberView.prototype.initDOM = function(){

	console.log("TeamMemberView.prototype.initDOM")

	this.$navItem = $(".team");
	this.$navItems	 = this.$el.find('.navigation li a');

	this.$memberBoard = $('.member-board');

	PageView.prototype.initDOM.call(this);

}

TeamMemberView.prototype.setupDOM = function() {

	PageView.prototype.setupDOM.call(this);
}

TeamMemberView.prototype.initTLShow = function() {

	PageView.prototype.initTLShow.call(this);
}

TeamMemberView.prototype.onDOMInit = function() {

	if (this.$memberBoard.children().length === 0) {
 
		$('.team-member-board').css('display', 'none');

	}
	
	this.setCurrentNavItem();

	PageView.prototype.onDOMInit.call(this);

}

TeamMemberView.prototype.setCurrentNavItem = function() {
	
	this.resetCurrentNavItem();
	
	var currentNavItem = this.$navItem;
	currentNavItem.addClass('current');
	
}

TeamMemberView.prototype.resetCurrentNavItem = function() {
	
	for (var i = 0; i < this.$navItems.length; i++) {

		$(this.$navItems[i]).removeClass('active');
		
	}
}

TeamMemberView.prototype.onShown = function() {

	PageView.prototype.onShown.call(this);
}

TeamMemberView.prototype.onClick = function() {

}

TeamMemberView.prototype.onResize = function() {

	PageView.prototype.onResize.call(this);
}


TeamMemberView.prototype.dispose = function() {

	PageView.prototype.dispose.call(this);
}

module.exports = TeamMemberView;