(function($){
$.fn.tixhover=function(){
function tixhover_setposition(div){
div.find("*").each(function(){
var t=$(this).closest(".img-hover");
var th=t.height();
var tw=t.width();
var sw=$(this).outerWidth();
var sh=$(this).outerHeight();
var elem=$(this);
if(elem.hasClass("hover-center")){
elem.css({top:th/2-sh/2 +"px",left:tw/2-sw/2 + "px"});
}

if(elem.hasClass("hover-left")){
elem.css({left:0,top:0});
}
if(elem.hasClass("hover-top")){
elem.css({top:0,left:tw/2-sw/2 + "px"});
}

if(elem.hasClass("hover-bottom")){
elem.css({bottom:0,left:tw/2-sw/2 + "px"});
}

if(elem.hasClass("hover-right")){
elem.css({right:tw/2-sw/2 + "px",top:0});
}



});
}

var overlayEffect="fadein";
var img_details,obj;
$("div.img-hover").mouseenter(function(){
obj=$(this);


img_details=obj.find(".img-details");
if(img_details ==undefined){
return false;
}


if(img_details.hasClass("left-to-right")){overlayEffect="left-to-right";}
if(img_details.hasClass("right-to-left")){overlayEffect="right-to-left";}
if(img_details.hasClass("top-to-bottom")){overlayEffect="top-to-bottom";}
if(img_details.hasClass("bottom-to-top")){overlayEffect="bottom-to-top";}
if(img_details.hasClass("fadein")){overlayEffect="fadein";}
switch(overlayEffect){
case 'left-to-right':
case 'right-to-left':
img_details.show().stop().animate({left:0},700);
break;
case 'top-to-bottom':
case 'bottom-to-top':
img_details.show().stop().animate({top:0},700);
break;
case 'fadein':
img_details.fadeIn("fast");

}
tixhover_setposition(obj);
}).mouseleave(function(){
switch(overlayEffect){
case 'left-to-right':
case 'right-to-left':
img_details.show().stop().animate({left:obj.width()*-1 + "px"},700);
//img_details.closest(".img-hover").find("img:first").removeClass();
break;
case 'top-to-bottom':
case 'bottom-to-top':
img_details.show().stop().animate({top:obj.height()*-1 + "px"},700);
//img_details.closest(".img-hover").find("img:first").removeClass();
break;
case 'fadein':
img_details.fadeOut("fast");
//img_details.closest(".img-hover").find("img:first").removeClass();
}
});
}
})(jQuery);	
