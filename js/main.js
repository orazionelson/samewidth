(function ( $ ) {
	
	/**
	 * Set same width in a group of elements
	 * by Alfredo Cosco 2015
	 *
	$.fn.getSameWidth = function (){
		var w=[];
		var selector = this;
		$(selector).children().each(function(){
			var val = $(this).outerWidth(); 
			w.push(val);
		});
		var maxw = Math.max.apply(Math, w);
		if($(selector).children().css('display')=='inline-block'){
			$(selector).children().css('width', maxw);
		}
		
		$(window).resize(function () {
			$(selector).children().removeAttr( "style" );
			$(selector).getSameWidth();
		});
	};
	 */
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
			console.log(selector);
			$(selector).removeAttr( "style" );
			$.jastTopFixedVnav(selector);
		});
		
		
		$('.v-nav').css('height', navHeight);
		}
	};
	


	/**
	 * Sroll to element
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
				
	$('.same-width').getSameWidth();
	
	

	
});

/************************
 * On Window resize
 * 
 **********************
$(window).resize(function () {
//jastSlider('.slides');//run on every window resize
//jastTopFixedVnav();
//$('.same-width').getSameWidth();
//console.log(slideWidth);
});*/

