(function($){
$.fn.tixlayzload=function(){
tixlazyLoad_init();
//function to check if object is in current viewport
function tixlazyLoad_inView(obj){
    //Window Object
    var win = $(window);
     //the top Scroll Position in the page
    var scrollPosition = win.scrollTop();
    //the end of the visible area in the page, starting from the scroll position
    var visibleArea = win.scrollTop() + win.height();
    //the end of the object to check
	//var objEndPos = (obj.offset().top + obj.outerHeight() );
    var objEndPos = (obj.offset().top + obj.outerHeight()/3 ); //return true even one third of the image is in viewport
    return(visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false)
}

function tixlazyLoad_init(){
//add spinners
$(".lazyload").html("").append("<div class='spinner'></div>");
$(".lazyload").each(function(i){
var imgWidth=$(this).attr("data-img-width"),imgHeight=$(this).attr("data-img-height");//if img has width and height add width and height to .lazyload element
if(imgWidth!== undefined) {  $(this).css({width:imgWidth + "px"}); }
if(imgHeight!== undefined) { $(this).css({height:imgHeight + "px"}); }
});

tixlazyLoad_lazyload();
}

function tixlazyLoad_lazyload(){
$(".lazyload").each(function(i){
var obj=$(this);
var rnd=parseInt(Math.random()*2000 +1);
var imgClass="img_"+rnd;
if(tixlazyLoad_inView(obj)){
var imgSrc=obj.attr("data-img"),imgWidth=obj.attr("data-img-width"),imgHeight=obj.attr("data-img-height"),effect=obj.attr("data-effect");
var img=new Image();
img.src=imgSrc;
if(imgWidth!== undefined) { img.width=imgWidth; }
if(imgHeight!== undefined) { img.height=imgHeight;}
img.onload=function(){
obj.after("<img  src='"+imgSrc+"' width='"+imgWidth + "' height='"+imgHeight+"' style='display:none' class='"+imgClass+" responsive_img' />");
obj.remove();
switch(effect){
case 'bounce':
$("."+imgClass).addClass("bounce").show();
break;
case 'bench':
$("."+imgClass).addClass("bench").show();
break;
case 'rotate':
$("."+imgClass).addClass("rotate").show();
break;
case 'slide':
$("."+imgClass).addClass("slide").show();
break;

default:
$("."+imgClass).fadeIn("slow");
}

}

}

});
}

$(window).scroll(function(){
tixlazyLoad_lazyload();
});


};

})(jQuery);	
