var BaseView  					= require('./../abstract/baseView');
var CV 							= require('./../config/currentValues');
var EVENT   					= require('./../events/events');

var CarouselView = function (options, datas){

	this.$carouselItemsContainer = null;
	this.$carouselItems = null;

	this.$arrowLeft = null;
	this.$arrowRight = null;

	this.currentIndex = 0;

	this.timer = null;

	this.events = {
			'click .right-arrow': 'nextItem',
			'click .left-arrow': 'prevItem'	
	}

	BaseView.call(this, options, datas);

}

_.extend(CarouselView, BaseView);
_.extend(CarouselView.prototype, BaseView.prototype);

CarouselView.prototype.initDOM = function(){

	this.$carouselItemsContainer = this.$el.find('.carousel-items-container');
	this.$carouselItems = this.$el.find('.carousel-item');

	this.$arrowLeft = this.$el.find('.arrow-left');
	this.$arrowRight = this.$el.find('.arrow-right');

	BaseView.prototype.initDOM.call(this);

}

CarouselView.prototype.onDOMInit = function(){

	this.startTimer();
}

CarouselView.prototype.startTimer = function(e) {

	this.timer = window.setTimeout($.proxy(this.nextItem, this), 6000);
}

CarouselView.prototype.stopTimer = function(e) {

	window.clearTimeout(this.timer);
	this.timer = null;
}

CarouselView.prototype.prevItem = function(e) {

	if (this.timer) {
		this.stopTimer();
	}

	this.goToItem(this.currentIndex-1);
}

CarouselView.prototype.nextItem = function(e) {

	if (this.timer) {
		this.stopTimer();
	}

	this.goToItem(this.currentIndex+1);
}

CarouselView.prototype.goToItem = function(index) {

	if (this.currentIndex === index) return;

	if (index > this.$carouselItems.length-1) {
		index = 0;
	}else if (index < 0 ) {
		index = this.$carouselItems.length-1;
	}

	this.currentIndex = index;

	this.updateCarouselItems(this.currentIndex);

}


CarouselView.prototype.updateCarouselItems = function(index) {
	
	for (var i = 0; i < this.$carouselItems.length; i++) {
		this.$carouselItems[i].classList.remove('active');
	}

	this.$carouselItems[index].classList.add('active');

	if (this.timer) {
		
		this.stopTimer();
	} else {

		this.startTimer();
	}
}

module.exports = CarouselView;