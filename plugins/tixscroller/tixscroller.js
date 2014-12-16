(function($){
   var Tixscroller   = function(element, options)
   {
   var elem = $(element);
   
	var defaults = {
				visible:3,
				duration:700,
				heightOffset:0,
				ranges: new Array({min:0,max:320,visible:1},{min:0,max:360,visible:1},{min:0,max:480,visible:1},{min:481,max:641,visible:2})
               	            };
/*							

ranges: an array of objects denoting what number of slides will be visible when ELEMENT 
size (please note: we are considering element size and not screen size) is in between min and max
visible: number of slides to slide at a time
duration: animation duration when sliding
*/
	 options = $.extend(defaults, options);
	 
var rng=options.ranges;
var elemWidth=elem.outerWidth();

/* change number of visible slides according to element size */
for(var i=0;i<rng.length; i++){
if(elem.width()>=rng[i].min && elem.width()<=rng[i].max){
options.visible=rng[i].visible;
}
};


	var ul=elem.find("ul.tixscroller");
	var li=ul.find(">li");
	var liFirst=ul.find(">li:first");
	var num=li.length;
	var navLeft=elem.find(".tixscroller_left");
	var navRight=elem.find(".tixscroller_right");
	
	var liWidth=0;
	var liHeight=0;
	


var tixscroller_init=function(){liWidth=elem.parent().outerWidth()/options.visible;
elem.addClass('tixscroller_wrapper').addClass('equiheight');
ul.css({position:'relative',display:'block',left:0});
ul.css({width:liWidth*num + "px",overflow:'hidden'});
var elemWidth;

if(liWidth*options.visible<elem.parent().outerWidth()){elemWidth=elem.parent().outerWidth();}else{
elemWidth=liWidth*options.visible;
}
elem.css({display:'block',overflow:'hidden',maxWidth:liWidth*num + "px", width:elemWidth + "px"});
li.find("img").addClass("responsive_img");
liHeight=liFirst.outerHeight();

/*
if(options.width>0){
liWidth=options.width/options.visible;
}else{
liWidth=liFirst.outerWidth();
}
*/



if(options.visible<=1){liWidth=elem.parent().outerWidth();}

li.css({width:liWidth + "px"});
//$.fn.tixequiheight();
//$.fn.tixequiheight();
}

 
 tixscroller_init();
 
 var tixscroller_move=function(moveto){

 var scrollto;
 var lft=ul.position().left;
 var mod=num%options.visible;
 var t=0;
 var v=options.visible;
  if(mod>0){
  var k=lft*-1+options.visible*liWidth;
 if(k>=num*liWidth-options.visible*liWidth){
 v=mod;
 }else{
 v=options.visible;
 }
 }
 
switch(moveto){
 case 'right':
 scrollto=lft-v*liWidth;
  break;
 case 'left':
   scrollto=lft + v*liWidth;
   break;
 default:
  scrollto=lft-v*liWidth;
 }
 
 
 
  ul.stop().animate({left:(scrollto) + "px"},
  {
  step:function(now,fx){
  
  var ll=ul.position().left;
  var n=num*liWidth*-1+options.visible*liWidth;
  console.log(ll);
  if(ll>0 && ll<=options.visible*liWidth  && moveto=="left")
  {
  ul.stop().animate({left:0 + "px"},100);
  return false;
  }
  
  if(ll<n && moveto=="right"){
ul.stop().animate({left:n + "px"},100);
  return false;
 }

  
  
  },
  duration:options.duration
  }
  
  
  );

 
 
  }
 
navLeft.click(function(e){
e.preventDefault();
tixscroller_move('left');
 
 });
 
navRight.click(function(e){
e.preventDefault();
tixscroller_move('right');
 
 });
 
 
 };

     $.fn.tixscroller = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixscroller')) return;

           // pass options to plugin constructor
           var tixscroller = new Tixscroller(this, options);

           // Store plugin object in this element's data
           element.data('tixscroller', tixscroller);
       });
	  
   };
})(jQuery);	

