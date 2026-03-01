function youTubes_makeDynamic() {
	var $ytIframes = $('iframe[src*="youtube.com"]');
	
	$ytIframes.each(function (i,e) {
		var $ytFrame = $(e);
		var ytKey;
		var tmp = $ytFrame.attr('src').split(/\//);
		tmp = tmp[tmp.length - 1];
		tmp = tmp.split('?');
		ytKey = tmp[0];
		
		var $ytLoader = $('<div class="ytLoader">');
		$ytLoader.append($('<img class="cover" src="https://i.ytimg.com/vi/'+ytKey+'/hqdefault.jpg">'));
		$ytLoader.append($('<div class="playBtn" src="img/play_button.png">'));
		$ytLoader.data('$ytFrame',$ytFrame);
		$ytFrame.replaceWith($ytLoader);
		$ytLoader.click(function () {
			var $ytFrame = $ytLoader.data('$ytFrame');
			$ytFrame.attr('src',$ytFrame.attr('src')+'?autoplay=1');
			$ytLoader.replaceWith($ytFrame);
		});
	});
};


$(document).ready(function(){

		// .topCover block autoResponsiveHeight
	window.onresize = function(){
		var topCoverH = $(window).height();
		
		if( $(window).width() > 640 ) {
			$('.topCover').css("min-height", topCoverH);
		} else {
			$('.topCover').css("min-height", topCoverH*.6);
			var curr_topCover = $('.topCover').height();

			if( $('.topCover img').height() < curr_topCover ) {
				$('.M-logo').css("padding-top", curr_topCover*.2);
			} else {
				$('.M-logo').css("padding-top", 0);
			}
		}
	}
	window.onresize();

		//top-fixed-nav
	window.onscroll = function() {
		var offset = 500;
		var duration = 300;
		var scroll_Height = window.pageYOffset;
		var topNavH = $('.topCover').height();
		
		if (scroll_Height > topNavH) {
			$('.top-nav').addClass('scrolled');
		} else {
			$('.top-nav').removeClass('scrolled');
		}

			//Youtube video coverrize
		youTubes_makeDynamic();

			//scrollToTop btn
		if ($(this).scrollTop() > offset) {
			$('#toTopBtn').fadeIn(duration);
		} else {
			$('#toTopBtn').fadeOut(duration);
		}
	};
	window.onscroll();

		//click on scrollToTop
	$('#toTopBtn').click(function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, 300);
		return false;
	})

			//smarthone sidebar-menu
	$('.nav-overlay, .btn-pad').on('click', function(){
		if( $(window).width() < 640 ) {
			var w = $('.menu-btn');
			// w.toggleClass('clicked').html('&#9776; Меню');
			w.toggleClass('clicked').text('Меню');

			$('html').css('overflow-y','unset');
			$('.nav-overlay').css("width", "0");
			$('.top-nav').toggleClass('responsive');
			$('.btn-pad').css({
				// 'top': 'unset',
				'left': '0%',
				// 'right': 'unset',
				// 'bottom': 'unset',
				'padding': '0 5% 5% 0',
				'transition': '0s'
			});

			if ( w.hasClass('clicked') ) {
				w.text(' ');
				
				$('html').css('overflow-y','hidden');
				$('.nav-overlay').css("width", "100%");
				$('.btn-pad').css({
					// 'top': '5%',
					'left': '68%',
					// 'right': '8%',
					// 'bottom': '0',
					'padding': '10% 5%',
					'transition': '.5s'
				});
			}
		}
	});

	$(document).on('click','.thumbnail-img', function(){
		var imgSrc = $(this).attr('src');
		$('.modal-contenT img').attr( 'src', imgSrc );
	})

	$('.Achiev_1, .Achiev_2, .Achiev_3').click(function(){
		var imgClass = $(this).attr('class').split(' ')[0];
		var imgNumb = parseInt( $(this).attr('alt') );
		var achieveN = imgClass.split('').pop();
		var imgSrc = $(this).attr('src');
		var iteM = $('.achieve-carousel .item');

		$('.modal-contenT img').attr( 'src', imgSrc );
		$('.Mcaption').text( $(this).parent().parent().find('p').text() );
		
		for( i = 0; i < imgNumb; i++ ) {
			$( iteM[i] ).html('<img src="img/gallery/min/a' + achieveN + '_' + (i+1) + '.jpg" class="thumbnail-img">');
		}
		$('html').css('overflow-y','hidden');
		$('.modal').addClass('show');
	})


		//Click on nav #ABOUT
	// $('a[href$="about"]').on('click', function(){
	// 	if( $('#about-head').hasClass('collapsed') ) {
	// 		$('#about-head').click();
	// 	}
	// });

		//After content toggle
	// $('.panel-heading').each( function() {
	//     $(this).click(function() {
	//         $(this).children().toggleClass('accordion-opened');
	//     })
	// });

		// --ScrollToTop pCards on hover off
	$('.pCardT').hover(
		function() {
			$( this ).scrollTop(0);
		}, function() {
			$( this ).scrollTop(0);
		}
	);


	//////////////////////////////////////////////////////
	// var dura = 10000;								//
	// $('.pLogoss').hover(								//
	// 	function (event) {								//
	// 		event.preventDefault();						//
	// 		$(this).animate({scrollLeft: 2000}, dura);	//
	// 	}, function (event) {							//
	// 		event.preventDefault();						//
	// 		$(this).animate({scrollLeft: 0}, dura);		//
	// })												//
	//////////////////////////////////////////////////////
	
	//===========================================================================\\
	//								Owl-Carousels								 \\
	//===========================================================================\\

		//Owl Carousel - Achieve
	$('.achieve-carousel').owlCarousel({
		items: 5,
		margin: 5,
		nav: true,
		stagePadding: 0,
		center: false,
		dots: false,
		// autoplay: true,
		// autoplayTimeout: 3000,
		// autoplayHoverPause: true,
		// loop: false,
		// rewind: true,
		navText: ['<span class="glyphicon glyphicon-chevron-left" aria-hidden="true" style="top:3px"></span>',
			  '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true" style="top:3px"></span>']
	});

		//Owl Carousel - Pills
	$('.pill-carousel').owlCarousel({
		rewind: true,
		margin: 0,
		stagePadding: 0,
		nav: true,
		startPosition: 14,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		dots: false,
		/*loop: false,*/
		/*center: true,*/
		navText: ['<span class="glyphicon glyphicon-chevron-left" aria-hidden="true" style="top:3px"></span>',
			  '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true" style="top:3px"></span>'],
		responsive:{
			0:{
				items: 1
			},
			600:{
				items: 2
			},
			960:{
				items: 3
			},
			1400:{
				items: 4
			}
		}
	});

		//Owl Carousel - partners
	$('.pLogos').owlCarousel({
		items: 4,
		margin: 100,
		loop: true,
		nav: false,
		stagePadding: 0,
		center: true,
		dots: false,
		autoplay: true,
		autoplayTimeout: 500,
		autoplaySpeed: 20000,
		autoplayHoverPause: true,
		// rewind: true,
		// navText: ['<span class="glyphicon glyphicon-chevron-left" aria-hidden="true" style="top:3px"></span>',
			  // '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true" style="top:3px"></span>']

	});
		//vList Owl
	$('.video-carousel').owlCarousel({
		startPosition: 3,
		stagePadding: 0,
		video: true,
		margin: 0,
		rewind: true,
		// loop: true,
		// videoHeight: 300, 
		// videoWidth: 600,
		lazyLoad: true,
		center: true,
		nav: true,
		navText: ['<span class="glyphicon glyphicon-menu-left" aria-hidden="true" style="top:3px"></span>',
			  '<span class="glyphicon glyphicon-menu-right" aria-hidden="true" style="top:3px"></span>'],
		responsive:{
			0:{
				items: 1
			},
			600:{
				items: 2
			},
			960:{
				items: 3
			}
		}

	})

				// ***************************Articles******************************** \\	
		//Fade effect on cards 
	$('.wrapper').css('transition-delay', '0s');

		//onClick on article-Pill Cards

	$('.card').on('click', function(){

		$('.modal').addClass('show');
		$('html').css('overflow-y','hidden');
		
		var folderName = $(this).find('.name').text();
		var aNumb = parseInt( $(this).find('.numb').text() );
		
		for(i = 1; i <= aNumb; i++){
			$('.bData').append('<a href="http://docs.google.com/gview?url=velpharm.uz/data/' + folderName + '/' + i + '.pdf&embedded=true" target="viewer"><span>Статья - #' + i + '</span></a>');
		}

		$('.modal iframe').attr('src', 'http://docs.google.com/gview?url=velpharm.uz/data/' + folderName + '/1.pdf&embedded=true');
	})
	
	$('.modal .close').on('click', function(){
		$('.modal').removeClass('show');
		$('html').css('overflow-y','unset');
		$('.bData').empty();
		// $('.achieve-carouseL').empty();
	})

	$(document).on('click','.bData a', function(){
		$('.bData a').removeClass('activeDoc');
		$(this).addClass('activeDoc');
	})
	

		//Citates-carousel
	$('.citates').owlCarousel({
		items: 1,
		// startPosition: 3,
		stagePadding: 0,
		margin: 0,
		rewind: true,
		loop: true,
		center: true,
		nav: false,
		navText: ['<span class="glyphicon glyphicon-menu-left" aria-hidden="true" style="top:3px"></span>',
			  '<span class="glyphicon glyphicon-menu-right" aria-hidden="true" style="top:3px"></span>'],
	})

	$('.logo').on('click', function(){
		var pathname = window.location.pathname.split('/').pop();
		if( pathname !== 'about.html'){
			window.location = 'about.html';
		} else {
			window.location = 'index.html';
		}
	})
});

