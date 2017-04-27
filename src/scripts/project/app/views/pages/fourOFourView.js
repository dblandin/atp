var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var fourOFourView = function (options, datas){

	console.log("fourOFourView")
	
	this.events = {
		'click': 'onClick'
	}

  PageView.call(this, options, datas);

}

_.extend(fourOFourView, PageView);
_.extend(fourOFourView.prototype, PageView.prototype);

fourOFourView.prototype.initDOM = function(){

	console.log("fourOFourView.prototype.initDOM")

	PageView.prototype.initDOM.call(this);

}

fourOFourView.prototype.setupDOM = function() {

	PageView.prototype.setupDOM.call(this);
}

fourOFourView.prototype.initTLShow = function() {

	PageView.prototype.initTLShow.call(this);
}

fourOFourView.prototype.onDOMInit = function() {

	PageView.prototype.onDOMInit.call(this);

}

fourOFourView.prototype.onShown = function() {

	PageView.prototype.onShown.call(this);
}

fourOFourView.prototype.onClick = function() {

}

fourOFourView.prototype.onResize = function() {

	PageView.prototype.onResize.call(this);
}


fourOFourView.prototype.dispose = function() {

	PageView.prototype.dispose.call(this);
}

module.exports = fourOFourView;