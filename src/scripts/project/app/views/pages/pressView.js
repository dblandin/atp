var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var PressView = function (options, datas){

	console.log("PressView")
	
	this.events = {
		'click': 'onClick'
	}

  PageView.call(this, options, datas);

}

_.extend(PressView, PageView);
_.extend(PressView.prototype, PageView.prototype);

PressView.prototype.initDOM = function(){

	console.log("PressView.prototype.initDOM")

	PageView.prototype.initDOM.call(this);

}

PressView.prototype.setupDOM = function() {

	PageView.prototype.setupDOM.call(this);
}

PressView.prototype.initTLShow = function() {

	PageView.prototype.initTLShow.call(this);
}

PressView.prototype.onDOMInit = function() {

	PageView.prototype.onDOMInit.call(this);

}

PressView.prototype.onShown = function() {

	PageView.prototype.onShown.call(this);
}

PressView.prototype.onClick = function() {

}

PressView.prototype.onResize = function() {

	PageView.prototype.onResize.call(this);
}


PressView.prototype.dispose = function() {

	PageView.prototype.dispose.call(this);
}

module.exports = PressView;