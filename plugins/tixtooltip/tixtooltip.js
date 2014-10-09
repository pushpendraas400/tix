(function($){
$.fn.tixtooltip=function(){
var tooltips=$(".tixtooltip"),caption="",direction="";
tooltips.mouseover(function(e){
if($("body").find("#tooltip").length==0){
$("body").append("<div id='tooltip'><p></p></div>");
}
 caption=$(this).attr("data-caption");
 direction=$(this).attr("data-direction");
 var pos=$(this).offset();
 
var posx=pos.left,posy=pos.top;
$("#tooltip p").html(caption);
var tp=$("#tooltip p"),linkw=$(this).outerWidth(),linkh=$(this).outerHeight(), elem=$("#tooltip"), tw=tp.outerWidth(), th=tp.outerHeight(),left;
switch(direction){
case "left":
elem.css({left:posx-10-tw + "px",top:posy + "px"}).fadeIn('fast');
break;
case "right":
elem.css({left:posx+10+linkw + "px",top:posy + "px"}).fadeIn('fast');
break;
case "top":
if(tw>=linkw){left=(posx)-(tw-linkw)/2;}else{left=(posx)+(linkw-tw)/2;}
elem.css({top:posy-10-linkh + "px",left:left + "px"}).fadeIn('fast');
break;
case "bottom":
if(tw>=linkw){left=(posx)-(tw-linkw)/2;}else{left=(posx)+(linkw-tw)/2;}
elem.css({top:posy+linkh+10 + "px",left:left + "px"}).fadeIn('fast');
break;
default://top
if(tw>=linkw){left=(posx)-(tw-linkw)/2;}else{left=(posx)+(linkw-tw)/2;}
elem.css({top:posy-10-linkh + "px",left:left + "px"}).fadeIn('fast');
}
}).mouseout(function(){
$("#tooltip").remove();
});
};
})(jQuery);	
$(document).ready(function(){
$.fn.tixtooltip();
});