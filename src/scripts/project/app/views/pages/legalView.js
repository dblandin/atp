var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var LegalView = function (options, datas){

	console.log("LegalView")
	
	this.events = {
		'click': 'onClick'
	}

  PageView.call(this, options, datas);

}

_.extend(LegalView, PageView);
_.extend(LegalView.prototype, PageView.prototype);

LegalView.prototype.initDOM = function(){

	console.log("LegalView.prototype.initDOM")

	PageView.prototype.initDOM.call(this);

}

LegalView.prototype.setupDOM = function() {

	PageView.prototype.setupDOM.call(this);
}

LegalView.prototype.initTLShow = function() {

	PageView.prototype.initTLShow.call(this);
}

LegalView.prototype.onDOMInit = function() {

	PageView.prototype.onDOMInit.call(this);

}

LegalView.prototype.onShown = function() {

	PageView.prototype.onShown.call(this);
}

LegalView.prototype.onClick = function() {

}

LegalView.prototype.onResize = function() {

	PageView.prototype.onResize.call(this);
}


LegalView.prototype.dispose = function() {

	PageView.prototype.dispose.call(this);
}

module.exports = LegalView;