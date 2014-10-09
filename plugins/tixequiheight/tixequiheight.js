(function($){
$.fn.tixequiheight=function(){
$(".equiheight").each(function(){
var obj=$(this);
var watch=obj.find(".watch");
var heights=new Array();

watch.each(function(){
var watchFor=$(this);
heights.push(watchFor.height());
});

watch.css({height:Math.max.apply(null,heights) + "px"});
});
}
})(jQuery);	
