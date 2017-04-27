var PageView  					= require('./../../abstract/pageView');
var CV 							= require('./../../config/currentValues');
var EVENT   					= require('./../../events/events');

var ContactView = function (options, datas){

	this.aMapElements = [];
	this.innerMapDiv = [];
	this.aMaps = [];

	isMobile = false;

  PageView.call(this, options, datas);

}

_.extend(ContactView, PageView);
_.extend(ContactView.prototype, PageView.prototype);

ContactView.prototype.initDOM = function(){

	this.aMapElements = this.$el.find('.gmap');
	this.$footerLinks = $('.footerLink');

	PageView.prototype.initDOM.call(this);

}

ContactView.prototype.onDOMInit = function() {

	for (var i = 0; i < this.$footerLinks.length; i++) {
		this.$footerLinks[i].classList.add('anchorLink');
	}

	for (var i = 0; i < this.aMapElements.length; i++) {

		var lat = this.aMapElements[i].dataset.lat;
		var lng = this.aMapElements[i].dataset.lng;
		var el = this.aMapElements[i];

		this.initMap(el, Number(lat), Number(lng));
	};

	PageView.prototype.onDOMInit.call(this);
}

ContactView.prototype.initMap = function(mapDiv, lat, lng) {

		var styles = [
	    {
	      stylers: [
	        { hue: "#000" },
	        { saturation: -100 },
	        { lightness: -90 }
	      ]
	    },
	    {
	      featureType: "all",
	      elementType: "labels",
	      stylers: [
	        { lightness: 50 },
	        { visibility: "simplified" }
	      ]
	    },
	    {
	      featureType: "poi",
	      elementType: "labels",
	      stylers: [
	        { visibility: "off" }
	      ]
	    },
	    {
	      featureType: "transit",
	      elementType: "labels",
	      stylers: [
	        { visibility: "off" }
	      ]
	    },
	    {
	      featureType: "water",
	      elementType: "geometry",
	      stylers: [
	        { lightness: 20 },
	        { visibility: "simplified" }
	      ]
	    },
	    {
	      featureType: "road.arterial",
	      elementType: "geometry",
	      stylers: [
	        { visibility: "on" },
	        { lightness: 5 }
	      ]
	    },
	    {
	      featureType: "road.local",
	      elementType: "geometry",
	      stylers: [
	        { visibility: "on" },
	        { lightness: 10 }
	      ]
	    }
	  ];

		var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

    var mapOptions = {
      center: {lat: lat, lng: lng},
      scrollwheel: false,
      zoom: 16,
      disableDefaultUI: true,
			disableDoubleClickZoom: true,
	    mapTypeControlOptions: {
	      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	    }
    };

    var map = new google.maps.Map(mapDiv, mapOptions);

    var markerLocation = {lat: lat, lng: lng};

    // var imageUrl = encodeURIComponent(window.location.href);

	  if ( CV.isMobile === true || CV.breakpoint === "sml" ) {
	    var markerWidth = 32;
	    var markerHeight = 50;
	  } else {
	    var markerWidth = 48;
	    var markerHeight = 75;
	  }

	  var image = { 
			url: '../assets/icons/icon_pin_map.svg', 
	    scaledSize: new google.maps.Size(markerWidth, markerHeight),
	    size: new google.maps.Size(markerWidth, markerHeight),
	    origin: new google.maps.Point(0,0), 
	    anchor: new google.maps.Point(10, 50) 
    }

		var marker = new google.maps.Marker({
		    position: markerLocation,
		    map: map,
		    title: 'Apple Tree Partners',
			icon: image,
			zIndex: 1,
			optimized: false
		});

		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');

    this.aMaps.push(map);

}

ContactView.prototype.onResize = function() {

	PageView.prototype.onResize.call(this);
}


ContactView.prototype.dispose = function() {

	PageView.prototype.dispose.call(this);
}

module.exports = ContactView;