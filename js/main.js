(function ( $ ) {
	
	/**
	 * Set same width in a group of elements
	 * by Alfredo Cosco 2015
	 * */
	/*$.fn.getSameWidth = function (){
		var w=[];
		var selector = this;
		$(this).children().each(function(){
			var val = $(this).outerWidth(); 
			w.push(val);
		});
		var maxw = Math.max.apply(Math, w);
		if($(this).children().css('display')=='inline-block'){
			$(this).children().css('width', maxw);
		}
		else {
			$(this).children().css('width', '100%');
			}
		console.log(this.offset());
		$(this).resize(function () {
			$().getSameWidth();
		});
	};*/
	
	/**
	 * Organize an article as Tabs
	 * by Alfredo Cosco
	 * 2015
	 * **/
	$.fn.jastTabs = function (){
	
	
	 $(this).each(function(){
		var tabsId= this.id;
		$(this).addClass('jast-tabs-style');
		//Wrap the sections in one div
		//Default: $( ".jast-tabs section" )
		//and add them progressive id: tab1, tab2, tab3...
		$(this)
		.find('section')
		.wrapAll( '<div class="tabs-sections" />')
		.each(function(i, tab) {
			tab.id = tabsId+"tab" + (i+1); //i starts at 0
		});
							
		var title=[];
		var titles = $(this).find('section h2').hide();
		
		$(titles).each(function(i){						
			title.push('<a href="#'+tabsId+'tab'+(i+1)+'" class="tab-labels" id="link-tab'+(i+1)+'">'+titles[i]['innerHTML']+'</a>');
			});

		var tabsMenu=title.join("</li>\n<li>");
		
		//Print the tab menu
		$(this).find('.tabs-sections').before('<ul class="tab-stripes"><li>'+tabsMenu+'</li></ul>');
		
		// Code found at http://www.jacklmoore.com/notes/jquery-tabs/
		// For each set of tabs, we want to keep track of
		// which tab is active and it's associated content
		var active; 
		var content;
		var links = $(this).find('a.tab-labels');

		// If the location.hash matches one of the links, use that as the active tab.
		// If no match is found, use the first link as the initial active tab.
		active = $(links.filter('[href="'+location.hash+'"]')[0] || links[0]);
		active.closest('li').addClass('active');
		content = $(active[0].hash);

		// Hide the remaining content
		links.not(active).each(function () {
			$(this.hash).hide();
		});

		// Bind the click event handler
		$(this).on('click', 'a.tab-labels', function(e){
			// Make the old tab inactive.
			active.closest('li').removeClass('active');
			content.hide();

			// Update the variables with the new link and content
			active = $(this);
			content = $(this.hash);

			// Make the tab active.
			active.addClass('active');
			active.closest('li').addClass('active');
			content.show();

			// Prevent the anchor's default click action
			e.preventDefault();			
			});
		});
		
	};

	/*****
	 * Make a pretty 'pre' for your code
	 * by Alfredo Cosco 2015
	 * source: http://stackoverflow.com/questions/4631646/how-to-preserve-whitespace-indentation-of-text-enclosed-in-html-pre-tags-exclu
	 * */
	$.fn.jastPrettyPre = function (){
		var preEl = $(this);
		
		for (var i = 0; i < preEl.length; i++)
			{	
			var content = $(preEl[i]).html()
					.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})
					.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>')
					;						
			var tabs_to_remove = '';
			while (content.indexOf('\t') == '0')
			{
			  tabs_to_remove += '\t';
			  content = content.substring(1);
			}
			var re = new RegExp('\n' + tabs_to_remove, 'g');
			content = content.replace(re, '\n');              
			$(preEl[i]).html(content);
			}	
		};
	
	/**
	 * Organize an article as Tabs
	 * by Alfredo Cosco
	 * 2015
	 * **/
	$.fn.jastContentSlider = function (){		
		//Set preliminary vars 
		var slidesId= this.id;		
		var currentPosition = 0;
		//calculate article container width	
		var mainWidth = $(this).width();
		var gutterWidth = (mainWidth/10);
		
		var sectionNumber = $(this).find('section').length;
		
		//Create and configure slides container
		$(this)
		.find('section')
		.wrapAll( '<div class="slides-sections clearfix" />')
		.each(function(i, slide) {
			slide.id = slidesId+"slide" + (i+1); //i starts at 0
		});
		
		var slideSectionWidth = mainWidth * sectionNumber * 1.3;		
		$('.slides-sections').width(slideSectionWidth);
		
		$(this).find('section').width(gutterWidth*8).css({
			'marginRight':gutterWidth+'px',
			'marginLeft':gutterWidth+'px'
			});
		
		//build pagination
		$(this).find('.slides-sections ').after('<div class="content-slider-pagination" />');
		$(this).find('.content-slider-pagination').append('<button class="pure-css button-success content-slider-control" id="leftcsControl"><i class="fa fa-arrow-left fa-2x"></i></button><button class="pure-css button-success content-slider-control" id="rightcsControl"><i class="fa fa-arrow-right fa-2x"></i></button>');
		
		if(currentPosition==0){ $('#leftcsControl').prop( "disabled", true ); } else{ $('#leftcsControl').prop( "disabled", false ); }
		// Hide right arrow if position is last slide
		if(currentPosition==sectionNumber-1){ $('#rightcsControl').prop( "disabled", true ); } else{ $('#rightcsControl').prop( "disabled", false ); }
		
		$('.content-slider-control')
	    .on('click', function(){
			// Determine new position
			currentPosition = ($(this).attr('id')=='rightcsControl') ? currentPosition+1 : currentPosition-1;
			if(currentPosition==0){ $('#leftcsControl').prop( "disabled", true ); } else{ $('#leftcsControl').prop( "disabled", false ); }
			// Hide right arrow if position is last slide
			if(currentPosition==sectionNumber-1){ $('#rightcsControl').prop( "disabled", true ); } else{ $('#rightcsControl').prop( "disabled", false ); }
			
			$('.slides-sections').animate({
			'marginLeft' : mainWidth*(-currentPosition)
			});
		});
	};
	
		/**
	 * Functions for the JAST gallery: normal/thumbnails
	 * by Alfredo Cosco
	 * 2015
	 * **/	
	$.fn.jastGallery = function (){
	
	$(this).each(function(){
				
		var galleryId = this.id;
		
		//make images responsive
		$(this).find('img').addClass('img-responsive center-block');
		
		//set shapes
		if($(this).hasClass('rounded')){
			$(this).find('img').addClass('img-rounded');
			}
		else if($(this).hasClass('circle')){
			$(this).find('img').addClass('img-circle');
			}
		
		//thumbs or slider
		if($(this).hasClass('thumbs')){
			//$(this).find('img');							
			src=[]
			$(this).find('img').each(function(i) {
				src.push($(this).attr('src'));
			}).addClass('img-thumbnail');				
			$(this).find('figure').each(function(i) {
				var figcaption = $(this).find('figcaption').text();
			
			//build the link for the lightbox
				$(this).wrapInner( '<a href="'+src[i]+'" data-lightbox="'+galleryId+'" data-title="'+figcaption+'"> </a>');
			
			//Add alt attribute to images using caption if alt is not set 
				$(this).find('img:not([alt])').attr('alt', figcaption);
				});
			$(this).find('figcaption').addClass('caption');	
			}
		else if($(this).hasClass('slides')){
			
			var currentPosition = 0;
			//calculate article container width	
			var mainWidth = $(this).width();
			var gutterWidth = (mainWidth/10);
		    
		    var figureNumber = $(this).find('figure').length;
		    
			var imgWidth = (gutterWidth*6.5);
			
			$(this).find('img').addClass('img-responsive center-block');
			

			$(this).find('figure')
			.wrapAll('<div class="slideshow" />')
			.each(function(i, slide) {
				slide.id = galleryId+"slide" + (i+1); //i starts at 0
			});
			
			
			$(this).find('figcaption').addClass('caption');
			
			
			var slideFigureWidth = mainWidth * figureNumber * 1.3;		
			$('.slideshow').width(slideFigureWidth);
		
			$(this).find('figure').width(gutterWidth*8).css({
				'marginRight':gutterWidth+'px',
				'marginLeft':gutterWidth+'px'
			});
			
			$(this).find('.slideshow').after('<div class="content-slider-pagination" />');
			$(this).find('.content-slider-pagination').append('<button class="pure-css button-success content-slider-control leftSlideControl"><i class="fa fa-arrow-left fa-2x"></i></button><button class="pure-css button-success content-slider-control rightSlideControl"><i class="fa fa-arrow-right fa-2x"></i></button>');
			
			$('.content-slider-control')
			.on('click', function(){
				// Determine new position
				currentPosition = ($(this).hasClass('rightSlideControl')) ? currentPosition+1 : currentPosition-1;
				if(currentPosition==0){ $('.leftSlideControl').prop( "disabled", true ); } else{ $('.leftSlideControl').prop( "disabled", false ); }
				// Hide right arrow if position is last slide
				if(currentPosition==figureNumber-1){ $('.rightSlideControl').prop( "disabled", true ); } else{ $('.rightSlideControl').prop( "disabled", false ); }
				
				$('.slideshow').animate({
					'marginLeft' : mainWidth*(-currentPosition)
					});
			});
			
			var selector=this;
			
				$(window).resize(function () {
					$('.slideshow').animate({
						'marginLeft' : 0
					});
					$('.content-slider-pagination').remove();
					$(selector).find('figure').unwrap();
				
					$('.jast-gallery').jastGallery();
				});					
			}		
		});
	}
/** / gallery **/
 
	
	/**
	 * Manage vertical top fixed menu
	 * by Alfredo Cosco 2015
	 * */
	 $.jastTopFixedVnav = function(selector){
		 
		if($(selector).hasClass('fixed')){
			
		var vmargin = $(selector).offset();
		
		var topMargin = vmargin.top;
		var leftMargin = vmargin.left;
		var navHeight = $(selector).css('height');
		var navWidth = $(selector).parent().css('width');
		
		
		
		$(selector).css({
			'position' : 'fixed',
			'top' : topMargin+'px',
			'left': leftMargin+'px',
			'width': navWidth
			});
			
		$(window).resize(function () {
			//console.log(selector);
			$(selector).removeAttr( "style" );
			$.jastTopFixedVnav(selector);
		});
		
		
		$('.v-nav').css('height', navHeight);
		}
	};
	


	/**
	 * Source: http://www.dconnell.co.uk/blog/index.php/2012/03/12/scroll-to-any-element-using-jquery/
	 * */
	$.scrollToElement = function(selector, time, verticalOffset) {	 
	    time = typeof(time) != 'undefined' ? time : 1000;
	    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	    selector = selector != '#' ? selector : 'body';
	    
	    element = $(selector);
	    
	    offset = element.offset();
	    topOffset = typeof(offset) != 'undefined' ? offset.top : 0;
	    
	    offsetTop = topOffset + verticalOffset;
	    
	    $('html, body').animate({
	        scrollTop: offsetTop
	    }, time);           
	}

	/**
	 * Function for the JAST Dialogs
	 * by Alfredo Cosco
	 * 2015
	 * cf. http://codepen.io/matt-west/full/bnhiC
	 * **/
	$.fn.jastDialog = function( action ) {

        if ( action === "open") {
            // Open popup code.
             
        $(this).on('click', function(e) {  
		e.preventDefault();	
		var dialogId =$(this).attr('id');
		var btn = $('#'+dialogId)[0];
		var typeId = $('dialog[data-name='+dialogId+']')[0];
				
		dialogPolyfill.registerDialog(typeId);

		if($(typeId)
		.hasClass('modal')){
			typeId.showModal();
			}
		else {
			typeId.show();
			}
		});
        }
 
        if ( action === "close" ) {
            // Close popup code.	
        $(this).on('click',function(e){
		e.preventDefault();
		var typeId = $(this).closest('dialog')[0];
		//console.log(typeId);
		typeId.close();
		});
		};
	};
	
	/*******************************************
	 * Dynamically charge script
	 * in function of selectors/ids/classes.
	 * A very basically use of: 
	 * http://api.jquery.com/jquery.getscript/
	 * by Alfredo Cosco 2015
	 * ***************************************
	$.cachedScript = function( url, options ) {
	 
	  // Allow user to set any option except for dataType, cache, and url
	  options = $.extend( options || {}, {
	    dataType: "script",
	    cache: true,
	    url: url
	  });
	 
	  // Use $.ajax() since it is more flexible than $.getScript
	  // Return the jqXHR object so we can chain callbacks
	  return jQuery.ajax( options );
	};*/
	
	
	/**
	 * Put style only on the first letter of each word in a phrase
	 * by Alfredo Cosco 2015
	 * **/	
	$.fn.jastFirstLetter = function (){
		//console.log($(this));
		$(this).each(function(){
		$(this).html(function(i,html){
			return html.replace(/(\S)(\S*)/g, '<span class="jast-first-letter-trigger">$1</span>$2');
		});
		
		 var classes = $(this)
						.attr('class')
						.split(' ')
						.filter(function(e){return e!=='jast-first-letter'});
		
		classes.map( function(item) {
		$('.jast-first-letter-trigger').addClass(item);	
			
		})
		
		if($(this).hasClass('text-capitalize')){
		$('.jast-first-letter-trigger').addClass('text-uppercase');	
		$(this).removeClass('text-capitalize');	
			}
		$(this).attr('class','');		
		});
	};

	/**
	 * Build a box with source code
	 * by Alfredo Cosco 2015
	 * **/	

	$.fn.jastCodeBox = function (){
		//console.log($(this).selector);
		var source = originalPageSource();
			
		var original = $(source).find($(this).selector);
		
		$(this).after('<div class="show-me-the-code clearfix"></div>')
		.each(function(i, tab) {
			
			var snippet = $(original[i]).html();
//						.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})
//						.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>')
						;
			
			tab.id = "code-box-" + (i+1); //i starts at 0	
			
			$(this).next()
			.append('<pre name="code-box-' + (i+1) + '">'+snippet+'</pre>')
			;
		})
		
		//Make a pretty pre
		$('.show-me-the-code pre').jastPrettyPre();
	};		

}( jQuery ));

/**
 * Functions for the JAST Slider gallery
 * by Alfredo Cosco
 * 2015
 * *
function jastSlider(obj){
	//Make default
	//Remove .controls and .slideInner
	// dynamic pieces to rewrite on resizing
	$('#leftControl').remove();
	$('#rightControl').remove();
	slideInner = $('.slideInner');
    slideInner.replaceWith(slideInner.html());
    
    //Set preliminary vars 
	var currentPosition = 0;
	
	//calculate main container width	
	var mainw = $(obj).width();
	
	//calculate left/right at 10% of main container
	var controlWidth = (mainw/10);
	
	// calculate slides container at 80% of main container
	var containerWidth = (controlWidth*8);
	
	// calculate img width 65% of container	
	var imgWidth = (controlWidth*6.5);
		
	//Serialize slides
	var slides = $('.slide');	
	// & count them		
	var numberOfSlides = slides.length;

	// Remove scrollbar in JS
	// re-set container width
	$('.slidesContainer').css({
		'overflow': 'hidden',
		'width': containerWidth
		});
		
	// Wrap all .slides with #slideInner div
	slides
	.wrapAll('<div class="slideInner"></div>')
	// Float left to display horizontally, readjust .slides width
	.css({
	  'float' : 'left',
	  'width' : containerWidth,
	  'margin': '0 auto'
	});
	
	// re-set single image width
	$('.slide img').css('width',imgWidth);

	// re-set .slideshow height, calculate it on the height of first pic
	$('.slideshow').css('height', $('.slideInner img:first').height()+50);

	// Set #slideInner width equal to total width of all slides
	$('.slideInner').css('width', containerWidth * numberOfSlides);
	
	// Insert controls in the DOM
	$('.slideshow')
	.prepend('<span class="control" id="leftControl">Clicking moves left</span>')
	.append('<span class="control" id="rightControl">Clicking moves right</span>');

	// Hide left arrow control on first load
	  manageControls(currentPosition,numberOfSlides);

		// Create event listeners for .controls clicks
	  $('.control')
	    .on('click', function(){
	    // Determine new position
		currentPosition = ($(this).attr('id')=='rightControl') ? currentPosition+1 : currentPosition-1;
	    
		// Hide / show controls
	    manageControls(currentPosition,numberOfSlides);
	    // Move slideInner using margin-left
	    $('.slideInner').animate({
	      'marginLeft' : containerWidth*(-currentPosition)
		});
	});
};

// Slides gallery manageControls: Hides and Shows controls depending on currentPosition
function manageControls(position,numberOfSlides){
	// Hide left arrow if position is first slide
	if(position==0){ $('#leftControl').hide() } else{ $('#leftControl').show() }
	// Hide right arrow if position is last slide
	if(position==numberOfSlides-1){ $('#rightControl').hide() } else{ $('#rightControl').show() }
};
/** / slider **/






/**
 * Get Closest in JS
 * http://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery
 * **/
function getClosest(el, tag) {
  // this is necessary since nodeName is always in upper case
  tag = tag.toUpperCase();
  do {
    if (el.nodeName === tag) {
      // tag name is found! let's return it. :)
      return el;
    }
  } while (el = el.parentNode);

  // not found :(
  return null;
}



/**
 * Build Toc
 * buildRec() http://jsfiddle.net/fA4EW/
 * **/
	
	function buildRec(nodes, elm, lv) {
		
	
    var node;
    // filter
    do {
        node = nodes.shift();
    } while(node && !(/^h[123456]$/i.test(node.tagName)));
    // process the next node
    
    if(node) {
        var ul, li, cnt;
        var curLv = parseInt(node.tagName.substring(1));
        
	        if(curLv == lv) { // same level append an il
	            cnt = 0;
	        } else if(curLv < lv) { // walk up then append il
	            cnt = 0;
	            do {
	                elm = elm.parentNode.parentNode;
	                cnt--;
	            } while(cnt > (curLv - lv));
	        } else if(curLv > lv) { // create children then append il
	            cnt = 0;
	            do {
	                li = elm.lastChild;
	                if(li == null)
	                    li = elm.appendChild(document.createElement("li"));
	                elm = li.appendChild(document.createElement("ul"));
	                cnt++;
	            } while(cnt < (curLv - lv));
	        }
	        li = elm.appendChild(document.createElement("li"));
	        //var target = getClosest(node, 'article');
	        //console.log();
	        // replace the next line with archor tags or whatever you want
	        li.innerHTML = '<a href="#'+node.id+'" role="menuitem">'+node.innerHTML+'</a>';
	        // recursive call
	        buildRec(nodes, elm, lv + cnt);
    }
}

/**
* 2011 by MOleYArd (MOYA) Software, http://www.moya.sk , http://www.moyablog.com
* Originally posted in http://www.moyablog.com/2011/10/06/innerouter-xhtml-or-how-to-get-truly-original-source-of-element-in-javascript/
* Script homepage: http://www.moyablog.com/innerouter-xhtml/
* Released under the Creative Commons Attribution-Share Alike 3.0  License, http://creativecommons.org/licenses/by-sa/3.0/
*/
function originalPageSource()  
{  
    var httpRequest = new XMLHttpRequest();  
    if (window.ActiveXObject)  
        httpRequest = new ActiveXObject ("Microsoft.XMLHTTP");  
    else if (window.XMLHttpRequest)  
        httpRequest = new XMLHttpRequest();  
  
    httpRequest.open('GET',document.location.href,false);  
    httpRequest.send(null);  
    if (httpRequest.status === 200)  
    {  
        return httpRequest.responseText;  
    }  
    else return false;  
} 


/************************
 * Wait until the DOM has 
 * loaded before querying 
 * the document
 * **********************/
$(document).ready(function(){

	/**
	 * Insert WAI-ARIA roles
	 * Source: https://www.drupal.org/node/47144
	 * **/
    // Set role=banner on #branding wrapper div.
    $("header#page-header").attr("role","banner");
    // Set role=complementary on #main-content blocks, sidebars and regions.
    //$(".block").attr("role","complementary");
    // Remove role=complementary from system blocks.
    //$(".block-system, td.block, tr.region, td.region").removeAttr("role","complementary");
    // Set role=main on #main-content div.
    $("main").attr("role","main");
    // Set role=search on search block and box.
    //$("#search-theme-form, #search-block-form, #search-form").attr("role","search");
    // Set role=contentinfo on the footer message.
    //$("#footer-message").attr("role","contentinfo");
    // Set role=article on nodes.
    $("article").attr("role","article");

    
	

	
	//Navigator Handler
		// 1) If requested create dynamic menu 
		// get all h*.toc-item in <main>
		if($('nav').hasClass('dynamic')) {
			
			var selector = '.toc-item';
			var all = $(selector);//document.getElementById("main").getElementsByTagName("*");
			var nodes = []; 
			for(var i = all.length; i--; nodes.unshift(all[i]));
			
			var lead = $('h1.lead-item').text();
			var leadHref = $('h1.lead-item').attr('id');//closest('article').attr('id');
			//console.log(lead);
			var result = document.createElement("ul");
			
			buildRec(nodes, result, 2);

			$("nav.dynamic").append(result);
			$("nav.dynamic").each(function(){
				$(this).find('ul').first().prepend('<li><a href="#'+leadHref+'"><i class="fa fa-home fa-lg"></i> '+lead+'</a></li>');
				});							
		}
		
		$('.h-nav.pull-right')
		.removeClass('pull-right')
		.find('ul').first()
		.addClass('pull-right');
					
		//2) Manage mobile menu: MOBILE=DEFAULT
		//The menu compressed in the hamburger icon 
		//must have the id #jast-main-menu.		
		//Add mobile menu container
		//NOTE:TODO:the user should be able to override #page-header
		$('#page-header').after('<div id="jast-mobile-menu" class="h-nav"></div>');
		

		//Add class="menu-item" e role="menuitem" to each nav element
		//Create mobile navigator of #jast-main-menu
		$('#jast-main-menu').mobilenav({
		label: '',
		prependTo: '#jast-mobile-menu',
		closeOnClick: true,
		init: function(){
		//Adjust mobile menu: remove a nested with a
			$( "#jast-mobile-menu a" )
				.has( "a" )
				//.attr('href', $( "#jast-mobile-menu li a a" ).attr('href'))
				.find( "a:first" )
				.contents()
				.unwrap()
				;
			if($('#jast-main-menu').hasClass('scrollable')){$('#jast-mobile-menu').find('nav').addClass('scrollable')}
			
			if ($('#page-header').css("position") === "fixed") {
				//$('#page-header').css('z-index','3');
				$('.mobilenav_btn').css('position','fixed');//.css('z-index','6');
				$('.mobilenav_menu').css({
					'position' : 'fixed',
					'width' : '100%',
					'top': $('#page-header').height()
					});
				$('.container').css({
					'padding-top': ($('#page-header').height())+5
					});
				} 	
			},
		});
		
		
		//3) Option:class:Scrollable
		//3.1)Calculate vertical offset
		//for fixed menu
		var vertOff;
		if ($('#page-header').css("position") === "fixed") {
		vertOff = -($('header#page-header').height())-5;
		} 
		else {vertOff = 0;}
		
		//3.2) Make menu scrollable
		$('nav.scrollable')
		.find('a')
		.click(function(e){
			e.preventDefault();
			var to = $(this).attr('href');			
			$.scrollToElement(to, 1000, vertOff);
			});
			
		//4) Add roles for nav and children
		//just after dynamic nav creation
	    $("nav").attr("role","navigation");
	    $("nav ul").attr("role","menu");
	    $("nav > ul").attr("role","menubar");
	    $("nav ul a").attr("role","menuitem");
	    
	    //5) Add classes for menuitems
	    $("nav li ul").closest('li').addClass("has-child");
		$("nav ul a").addClass("menu-item");
		
		$.jastTopFixedVnav('.v-nav');
		
		//$('.h-nav li li').last().css('border', '4px solid blue');
		


		

		//$('nav').each(function(){
		//$('nav.this-page').find('a').attr('class','menuitem');
		

		
				
									
		
		

		
		//
	/*
		
		$(this)
		.find('li')
		.each(function(){
			$(this).addClass('menu-item');
			})
		.first()
		.addClass('active');
		
		$(this)
		.find('li')
		.on('click',function(e){
			//e.preventDefault();
			var ref = $(this).find('a').attr('href');
			//console.log(ref);
			$('nav li').removeClass('active');
			$('nav a[href='+ref+']').closest('li').addClass('active');
			});
		
		if($(this).hasClass('v-nav')){
			$(this).addClass('clearfix');
			
			
			
	
			if($('.v-nav').hasClass('scrollable')){
				$(this).find('a').attr('data-scroll','true');
				
				$.cachedScript( "js/scroll.js" )
				.done(function( script, textStatus ) {			
					console.log( 'Scroller: '+textStatus );
				});
				$.cachedScript( "js/fixed-responsive-nav.js" )
				.done(function( script, textStatus ) {
					console.log( 'Fixedresponsive: '+textStatus );
				});
				
				
				}
				
			}
		//attr( "menu-item", "Beijing Brush Seller" );
		
		
		});*/
		
	/**
	 * Matrix: Scan for selectors for scripts 
	 * with dependencies and call them only if needed
	 * by Alfredo Cosco
	 * cfr. cachedScript function
	 * *
	var matrix = {};
	var matrix = {
		dialogs:{ 
				hook : 'dialog', 
				src : 'js/dialog-polyfill.js', 
				actions : [
					$('.show-dialog').jastDialog('open'),
					$('.close-dialog').jastDialog('close') 
					]  
				},
		lightbox:{ 
				hook : 'article.jast-gallery', 
				src : 'js/lightbox.min.js',
				actions : [
					$('.jast-gallery').jastGallery()
					]
				}
		};
	
	//console.log(matrix.dialogs);
	//console.log(matrix);	
	for(var key in matrix) {
		
		var hook = matrix[key].hook;
		var src = matrix[key].src;
		var actions = matrix[key].actions
		var actionsLength = matrix[key].actions.length;
		
		if($( hook ).length > 0){	
			$.cachedScript( src )
			.done(function( script, textStatus ) {
				for (var i = 0; i < actionsLength; i++) {
					actions[i];
					}
			console.log( hook +' : '+src+' : '+textStatus );
			});
		} 
		else {console.log("don't need for "+ hook +" : "+ src);}
		}
*/
	//Optional
	$('pre').jastPrettyPre();
	
	//Default selectors	
	$('.jast-tabs').jastTabs();
	$('.jast-content-slider').jastContentSlider();
	$('.jast-gallery').jastGallery();
	
	$('.jast-code-box').jastCodeBox();
	$('.jast-first-letter').jastFirstLetter();	
	
	$('.show-dialog').jastDialog('open'),
	$('.close-dialog').jastDialog('close')
				
	//$('.same-width').getSameWidth();
	
	

	
});

/************************
 * On Window resize
 * 
 ***********************/
$(window).resize(function () {
//jastSlider('.slides');//run on every window resize
//jastTopFixedVnav();
//$('.same-width').getSameWidth();
//console.log(slideWidth);
});

