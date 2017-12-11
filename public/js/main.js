$(function() {
	//////////////////////////////////////////////////////////////////////////////
	// Menu

	$('#menu, #navigation .close').on("click", function(e) {
		$("#navigation").toggleClass('active');
		$(".logo").toggleClass('nav');
	});

	//////////////////////////////////////////////////////////////////////////////
	// Navigate to page when only hash changes

	$('.hard-hash').on("click", function(e) {
		window.location.href = $(this).attr('href');
		location.reload();
	});

	//////////////////////////////////////////////////////////////////////////////
	// Navigate to hash

	$(window).load(function() {
		var currentPath = window.location.pathname;
		if(window.location.hash) {
			var hash = window.location.hash.substring(1);
			console.log("path", currentPath, hash, currentPath.substr(0, 10));
			if(currentPath.substr(0, 10) == '/expertise'){
				// Company
				if(hash.indexOf('&') !== -1){
					hashPieces = hash.split('&');
					hash = hashPieces[0];
					console.log(hashPieces, $('.toggle-nav[data-pane="'+hashPieces[1]+'"]'));
					$('.toggle-nav[data-pane="'+hashPieces[1]+'"]').click();
					// $('.toggle-nav[data-pane="'+hashPieces[1]+'"]').addClass('active');
					// $('.companies[data-pane="'+hashPieces[1]+'"]').removeClass('hidden');
					paneSelect('subnav', hash);
				} else {
					if(hash == 'portfolio' || hash == 'team' || hash == 'investments') {
						paneSelect('subnav', hash);
					}
				}
			}
			if(currentPath == '/contact'){
				paneSelect('subnav', hash);
				moveToLocation();
			}
		}
		$('.blocker').fadeOut(800);
	}).on('resize', function(){
		//
	}).scroll(function() {
		var windowScroll = $(window).scrollTop();
		if(windowScroll > 100){
			$('.down-arrow').hide(500);
		} else {
			$('.down-arrow').show(500);
		}
	});

	//////////////////////////////////////////////////////////////////////////////
	// Filter News

	$('.toggle-year-filter').on("click", function(e) {
		$('.year-filter-dropdown').toggleClass('active');
		$('.company-filter-dropdown').removeClass('active');
		if($('.year-filter-dropdown').hasClass('active')){
			$('.news-nav-split').show();
		} else {
			$('.news-nav-split').hide();
		}
	});

	$('.toggle-company-filter').on("click", function(e) {
		$('.company-filter-dropdown').toggleClass('active');
		$('.year-filter-dropdown').removeClass('active');
		$('.news-nav-split').hide();
	});

	$('.year-filter-dropdown li').on("click", function(e) {
		$('.year-filter-dropdown li').removeClass('active');
		$(this).addClass('active');
		$('.year-filter-dropdown').removeClass('active');
		filterNews();
	});

	$('.company-filter-dropdown li').on("click", function(e) {
		$('.company-filter-dropdown li').removeClass('active');
		$(this).addClass('active');
		$('.company-filter-dropdown').removeClass('active');
		filterNews();
	});

	function filterNews() {
		var yearFilter = $('.year-filter-dropdown li.active').attr('id');
		var companyFilter = $('.company-filter-dropdown li.active').attr('id');
		$('.news-tile').removeClass('active').removeClass('hidden');
		var results = $('.news-tile.'+yearFilter+'.'+companyFilter).addClass('active');
		if(results.length > 0){
			if(results.length >= 5){
				$('.load-more-container').show();
			} else {
				$('.load-more-container').hide();
			}
			$('.no-more-container').addClass('hidden');
			$('.news-tile.active').each(function( index ) {
				if(index >= 5){
					$(this).addClass('hidden');
				}
			});
		} else {
			$('.load-more-container').hide();
			$('.no-more-container').removeClass('hidden');
		}
	}

	$('.load-more').on("click", function(e) {
		var countHidden = $('.news-tile.hidden').length;
		if(countHidden > 0){
			$('.news-tile.hidden').each(function( index ) {
				if(index < 5){
					$(this).removeClass('hidden');
				}
			});
			if($('.news-tile.hidden').length === 0) {
				$('.load-more-container').hide();
			}
		} else {
			$('.load-more-container').hide();
		}
	});

	//////////////////////////////////////////////////////////////////////////////
	// Toggle Panes

	$('.toggle-nav').on("click", function(e) {
		e.preventDefault();
		var pane = $(this).data('pane');
		var group = $(this).data('group');
		paneSelect(group, pane);
		if($(this).hasClass('load-map')){
			moveToLocation();
		}
	});

	function paneSelect(group, pane) {
		$("." + group).addClass('hidden');
		$("."+group+"[data-pane='"+pane+"']").removeClass('hidden');
		$(".toggle-nav[data-group='"+group+"']").removeClass('active');
		$(".toggle-nav[data-pane='"+pane+"']").addClass('active');
		if(group == 'subnav') {
			location.hash = hashTitle(pane);
			$('.tablet-nav').addClass('hidden');
			$(".tablet-nav[data-tablet='"+pane+"']").removeClass('hidden');
		}
	}

	function hashTitle(string) {
		value = string.split(' ').join('_');
		return value;
	}

	function unhashTitle(string) {
		value = string.split('_').join(' ');
		return value;
	}

	//////////////////////////////////////////////////////////////////////////////
	// Down Arrow Advance

	$('.down-arrow').on("click", function(e) {
		$('html, body').animate({
			scrollTop: ($(".expertise-section").offset().top - 100)
		}, 1000);
		$(this).hide(500);
	});

	//////////////////////////////////////////////////////////////////////////////
	// Map

	var map, marker;

	if($('#map').length > 0){
		initMap();
	}

	function moveToLocation(){
		var lat = $('.map-item:not(.hidden)').data('lat');
		var lon = $('.map-item:not(.hidden)').data('lon');
		var center = new google.maps.LatLng(lat, lon);
		// $('#mapLink').attr('href', "https://www.google.com/maps/preview/@"+lat+","+lon+",8z");
		// $('#mapLink').attr('href', "https://www.google.com/maps/place/"+$('.map-item:not(.hidden)').data('address'));
		marker.setPosition(center);
		map.panTo(center);
	}

	function initMap() {
		var lat = $('.map-item:not(.hidden)').data('lat');
		var lon = $('.map-item:not(.hidden)').data('lon');

		// $('#mapLink').attr('href', "https://www.google.com/maps/preview/@"+lat+","+lon+",17z");
		// $('#mapLink').attr('href', "https://www.google.com/maps/place/"+$('.map-item:not(.hidden)').data('address'));

		var mapOptions = {
			zoom: 15,
			center: new google.maps.LatLng(lat, lon),
			styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]}]
		};

		var mapElement = document.getElementById('map');

		map = new google.maps.Map(mapElement, mapOptions);

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lon),
			map: map,
			title: 'ATP',
			icon: {
				path: 'M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0',
				fillColor: '#FF3F16',
				fillOpacity: 1,
				strokeColor: '#FF3F16',
				strokeWeight: 2,
				scale: 1,
			}
		});

		map.setOptions({
			draggable: true,
			zoomControl: false,
			scrollwheel: false,
			disableDoubleClickZoom: true,
			streetViewControl: false,
			disableDefaultUI: true
		});

		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});
	}

	//////////////////////////////////////////////////////////////////////////////
	// Carousel

	// Does carousel exist?
	if($('.carousel-items-container').length > 0){
		console.log('carousel exists');
		// Initialize the carousel (drag)
		var carousel = new Siema({
			onChange: onChange,
			selector: '.carousel-items-container',
			duration: 350,
			easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
			loop: true
		});
	}

	function onChange() {
		console.log('carousel changed');
		var currentSlide = carousel.currentSlide;
		$('.carousel-indicators button').removeClass('active');
		$('.carousel-indicators button').eq(currentSlide).addClass('active');
	}

	// Add click handler to indicators
	$('.carousel-indicators button').on("click", function(e) {
		console.log('carousel button', carousel);
		carousel.goTo($(this).index());
	});

	//////////////////////////////////////////////////////////////////////////////
});