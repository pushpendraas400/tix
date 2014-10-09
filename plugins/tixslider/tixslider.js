(function($){
   var TixSlider = function(element, options)
   {
   var slider = $(element);
   		var obj=this;
		var defaults = {
                current: 1,
                prev: "&laquo;",
                next: "&raquo;",
                type: 'slide', // can rotate,slide
                autoplayInterval: 10000,
                animationInterval: 800,
				autoPlay:true,
				progressBar:false,
         		width:0,
				height:0,
				nav:'dots' //can be dots
            };
           
// Extend our default options with those provided.
 options = $.extend(defaults, options);
  slider.addClass("tixslider");
 var current=options.current;
 var ul=slider.find(".slider");
var autoPlayHandler;

 
 var li_width=ul.find("li:first").width();
 var count=ul.find("li").length;
 var slider_nav;
 var slider_navigation;
 //shows a message
var tixslider_show_msg=function(msg,type){
var m=slider.find('.msg');
m.html('');

switch(type){
case 'info':
m.html(msg).removeClass().addClass("msg").addClass('info');
break;
case 'error':
m.html(msg).removeClass().addClass("msg").addClass('error');
break;
default:
m.html(msg).removeclass().addClass("msg").addClass('info');

}
m.css({top:0}).slideDown("fast");

};

var tixslider_hide_msg=function(){
slider.find('.msg').hide().css({top:"-100px"});
};
 
	var tixslider_setWidth=function(){
		//if user has provided width and height parameter appley it to image and wrapper				
				if(options.width>0 && options.height>0 ){ //both parameters should be provided else only width will do the trick
				slider.css({"max-width":options.width + "px"});
									ul.find("img").css({"max-width":options.width + "px",width:"100%",height:"auto",'max-height':options.height + "px",display:"block"});
					}else{
					ul.find("img").css({"max-width":"100%",height:"auto",display:"block"});
					}
		}; 
 
 

 
 		
									/* highlight navigational dot */
		var tixslider_highlightDot=function(){
		if(options.nav=="dots"){
		slider_nav.find(".nav").removeClass("selected");

		slider_nav.find(".nav:nth-child("+(options.current)+")").addClass("selected");
		}
              
			};
			
			
			//hide left nav if current slide is 1 and hide right nav if current slide is >=count

				var tixslider_hideNavButtons=function(){
				if(options.current<=1){slider.find(".nav_left").hide(); return false;}
                if (options.current >= count) {
                    slider.find(".nav_right").hide();
                    return false;
                }
				slider.find(".nav_left").show();
				slider.find(".nav_right").show();
				};
	
	
		/* this function is called if options.type='rotate'
			*/
			
			    var tixslider_rotateTo = function(rotate_to) {
                
				var li_current = ul.find("li:nth-child(" + options.current + ")");
                //var li_current = ul.find("li:eq(" + (options.current - 1) + ")");
                var li_to = ul.find("li:nth-child(" + rotate_to + ")");
				li_current.fadeOut("fast");
                li_to.fadeIn("slow");
				
                options.current = rotate_to;
                if (options.current > count) {
                    options.current = 1;
                }
               tixslider_hideNavButtons();
               tixslider_highlightDot();

            };
	
	/* this function is called if options.type='slide'
			*/
	 var tixslider_slideTo=function(scroll_to){
					
			 var li = ul.find("li:nth-child(" + (scroll_to) + ")");
			  if (options.current == scroll_to)
                    return false;
					var left = (scroll_to * 100) -100;
					
					left = left * -1;
					 //var caption = li.find("img").attr("caption");
					 // $(".caption").hide();//hide all captions
					  ul.stop(true,true).animate({left: left + "%"}, options.animationInterval); //animate sliding
			options.current=scroll_to;			
			tixslider_hideNavButtons();
               tixslider_highlightDot();
			
			};


			

 /* scroll slider */
 /* public function can be called from outside */
  this.tixslider_scrollTo=function(slide_no){
   switch(options.type){
			 case "slide":
			tixslider_slideTo(slide_no);
				break;
				case "rotate":
				 tixslider_rotateTo(slide_no);
				break;

		
				
			 }
  
				tixslider_hide_msg();
  tixslider_resetProgressBar();
 };
 
 
 var tixslider_scrollNext=function(){
			var moveto=options.current + 1;
                if (moveto > count) {
                    moveto = 1;
                }
               
			  
			   
                 obj.tixslider_scrollTo(moveto);
			};
			var tixslider_scrollPrev=function(){
			var moveto=options.current - 1;
                if (moveto < 1) {
                    moveto = 1;
                }
               
			   
                 obj.tixslider_scrollTo(moveto);
			};
			
	

		var tixslider_autoScroll=function(){
		
			var moveto=options.current + 1;
                if (moveto > count) {
                    moveto = 1;
                }
            
			 
                 obj.tixslider_scrollTo(moveto);
				tixslider_animateProgressBar();
            };
			
		var tixslider_animateProgressBar=function(){
		if(options.progressBar==false){return false;}
		
			var progressbar=slider.find(".progress");
			   var currentProgress=progressbar.width();
			   progressbar.stop().animate({width:slider.width()},options.autoplayInterval,function(){
			   
			 tixslider_stopProgressBar();
			 tixslider_resetProgressBar();
			
			   }
			   );
			};
			
			var tixslider_resetProgressBar=function(){
			var progressbar=slider.find(".progress");
			progressbar.css({width:0});
			
			};
			
			var tixslider_stopProgressBar=function(){
			var progressbar=slider.find(".progress");
			progressbar.stop(true,false);
			};
			
			
			
 
var tixslider_autolaodImages=function(){
slider.css({visibilty:"hidden"});
var imgs=ul.find("img");
imgs.hide();
var imgsCount=imgs.length;
imgs.each(function(i){
var img=new Image();
var theImage=$(this);
img.src=theImage.attr("src");

img.onload=function(){
theImage.show();

};
if(i>=count-1){slider.css({visibility:"visible"});slider.find(".spinner").remove();}
});
}	
 
var tixslider_init=function(){

	slider.css({width:li_width+"px"});

slider.append("<div class='spinner'></div>");
	ul.css({width:count*100 + "%"});
		ul.find("li").css({"width": 100 / count + "%"});
			if(options.nav=="dots"){
			slider.append("<div class='slider_nav'><ul></ul></div>");
			slider_nav=slider.find(".slider_nav");
			slider_nav.hide();
				for(var i=0;i<count;i++) //create nav dots
				{
			    slider_nav.find('ul').append("<li class='nav'>&nbsp;</li>");
				}
			   	
					}
		
		tixslider_setWidth();

slider_nav.show();			

			
			//error handling
			slider.append("<div class='msg'></div>");
			slider.append("<div class='progress'></div>");
			//append navigation controls
			slider.append("<div class='nav_left'><span>" + options.prev + "</span></div><div class='nav_right'><span>" + options.next + "</span></div>");
			if(isNaN(options.animationInterval) || options.animationInterval<=0){tixslider_show_msg("Invalid <b>animationInterval</b> value. Must be > 0","error");}	
			if(options.current>count || options.current<0){options.current=1;current=1;tixslider_show_msg("Invalid <b>Current</b> value. Reset to 1","error");}
				if(isNaN(options.width) || options.width<0){tixslider_show_msg("Invalid <b>width</b> value. Must be >= 0","error");}
					if(isNaN(options.height) || options.height<0){tixslider_show_msg("Invalid <b>height</b> value. Must be > 0","error");}		
						if(options.autoPlayInterval<=0){tixslider_show_msg("Invalid <b>autoPlayInterval</b> value. Must be > 0","error");}	
 
 tixslider_hideNavButtons();
 tixslider_highlightDot();
 if(options.autoPlay==true){
  autoPlayHandler = setInterval(tixslider_autoScroll, options.autoplayInterval);
  tixslider_animateProgressBar();
  }
 };
 
 tixslider_init();
 tixslider_autolaodImages();
 //click event for dots
				if(options.nav=="dots"){
				slider_nav.find(".nav").click(function(e) {
               
                var index = $(this).parent().children().index(this);
                
				tixslider_stopProgressBar();
				tixslider_resetProgressBar();
                obj.tixslider_scrollTo(index+1);
				tixslider_animateProgressBar();
				});
				}
				
				
				/* click event for nav left and nav right arrow buttons */
				 slider.find(".nav_left").click(function(e) {
               
					if(options.current==1){
                    return false;
					}
				tixslider_stopProgressBar();
				tixslider_resetProgressBar();
			 
                obj.tixslider_scrollTo(options.current - 1);
				tixslider_animateProgressBar();
				});


				slider.find(".nav_right").click(function(e){
				
                if (options.current == count) {
                    return false;
                }
				
				tixslider_stopProgressBar();
				tixslider_resetProgressBar();
				
				obj.tixslider_scrollTo(parseInt(options.current + 1)) ;
				tixslider_animateProgressBar();
				});
				
			

			/* slide on image click */
				slider.find(".tslider").click(function(e) {
				var half=slider.width()/2;
				if(e.pageX<=half){
				if(options.current>1){
				obj.tixslider_scrollTo(options.current-1);
				}
				}
				if(e.pageX>=half){
                   if (options.current < count) {
				obj.tixslider_scrollTo(options.current+1);
						}
					}
			});

			
   
   };
   
      $.fn.tixslider = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixslider')) return;

           // pass options to plugin constructor
           var tixslider = new TixSlider(this, options);

           // Store plugin object in this element's data
           element.data('tixslider', tixslider);
       });
	  
   };
})(jQuery);	