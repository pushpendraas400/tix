(function($){
$.fn.tixlightbox=function(){
var lightbox_current=0;
var lightbox_total=0;
function createOverlay(){
if($("body").find("#overlay").length==0){$("body").append("<div id='overlay'></div>");$("#overlay").css({height:$(document).height()})}
}
function showOverlay(){
$("#overlay").show();
}
function closeOverlay(){
$("#overlay").hide();
}
function closeLightbox(){
$("#tix-lightbox").fadeOut("fast").remove();
}
function lightboxCount(group){
return $("a[data-group='"+group+"']").length;
}
function loadImage(imgSrc){
var image=new Image();
image.src=imgSrc;
image.onload=function(){
//image.width=image.width;
if(image.width>=$(window).width() || image.height>=$(window).height()){
image.adjustsize=true;
}

}
return image;
}

function addNav(rel){
var t=$("a[data-group='"+rel+"']").length;

$("#tix-lightbox").find(".tix-lightbox-prev").remove();$("#tix-lightbox").find(".tix-lightbox-next").remove();
if(t>1){$("#tix-lightbox .tix-lightbox-content").append("<div class='tix-lightbox-prev'><a href='#'></a></div><div class='tix-lightbox-next'><a href='#'></a></div>");
$(".tix-lightbox-next a").attr("rel",rel);
$(".tix-lightbox-prev a").attr("rel",rel);
}
$(".tix-lightbox-content .tix-lightbox-next a").click(function(e){
e.preventDefault();

var rel=$(this).attr("rel");
lightbox_current++; if(lightbox_current>lightbox_total-1){lightbox_current=0;}
var imgSrc=$("a.lightbox[data-group='"+rel+"']:eq("+lightbox_current+")").attr("href");
$("#tix-lightbox .tix-lightbox-content").html("");
createLightbox($("a.lightbox[href='"+imgSrc+"']"));
});

$(".tix-lightbox-content .tix-lightbox-prev a").click(function(e){
e.preventDefault();

var rel=$(this).attr("rel");
lightbox_current--;if(lightbox_current<0){lightbox_current=lightbox_total-1;}
var imgSrc=$("a.lightbox[data-group='"+rel+"']:eq("+lightbox_current+")").attr("href");
$("#tix-lightbox .tix-lightbox-content").html("");
createLightbox($("a.lightbox[href='"+imgSrc+"']"));
});
}
//ends addNav
function showLightbox(imgSrc){
//var image=loadImage(imgSrc);
$("#tix-lightbox").css({left:($(window).width() - 120 ) / 2+$(window).scrollLeft() + "px",top:($(window).height() - 60)/2 + "px"}).show();
var image=new Image();
image.src=imgSrc;
image.onload=function(){
var imageWidth=image.width;
var imageHeight=image.height;
if(image.width>=$(window).width() || image.height>=$(window).height()){
image.adjustsize=true;
}
var lightboxLeft=($(window).width() - imageWidth ) / 2+$(window).scrollLeft();
var lightboxTop=$(window).height() *10/100;
var imgClass="";
$("#tix-lightbox").css({width:"auto"});
if(image.adjustsize==true){
imgClass="responsive_img";$("#tix-lightbox").css({width:"75%"});
var lightboxLeft=($(window).width() - $(window).width()*75/100 ) / 2+$(window).scrollLeft(); //if image needs to adjust(image size > screen size) make image 75% in width
var lightboxTop=$(window).height()*5/100 ;

}
$("#tix-lightbox .tix-lightbox-content").html("").append("<img  class='"+imgClass+"' src='"+imgSrc+"'/>");//$("#tix-lightbox .tix-lightbox-header").find(".spinner").remove();
$("#tix-lightbox").hide().css({left:lightboxLeft+"px",top:lightboxTop+"px"});
//addNav(lightbox.attr("data-group"));
addNav($("a[href='"+imgSrc+"']").attr("data-group"));
createOverlay();
showOverlay();
$("#tix-lightbox").fadeIn("fast");
}
}


function createLightbox(lightbox){
if($("body").find("#tix-lightbox").length==0){$("body").append("<div id='tix-lightbox'><div class='tix-lightbox-header'><a href='#' class='tix-lightbox-close'>&times;</a></div><div class='tix-lightbox-content'></div><div class='tix-lightbox-footer'></div><div class='tix-lightbox-prev'></div><div class='tix-lightbox-next'></div></div>");}
var title=lightbox.attr("data-title")==undefined?"":lightbox.attr("data-title");
var footer=lightbox.attr("data-footer")==undefined?"":lightbox.attr("data-footer");

$("#tix-lightbox .tix-lightbox-content").append("<div class='spinner'></div>");
$("#tix-lightbox .tix-lightbox-header").find("p").remove();
$("#tix-lightbox .tix-lightbox-footer").find("p").remove();
$("#tix-lightbox .tix-lightbox-header").append("<p>"+title+"</p>");
$("#tix-lightbox .tix-lightbox-footer").append("<p>"+footer+"</p>");
showLightbox(lightbox.attr("href"));


}

$(".lightbox").click(function(e){
e.preventDefault();
var lightbox=$(this);
lightbox_current=$(".lightbox").index(this);
lightbox_total=$("a.lightbox[data-group='"+lightbox.attr("data-group")+"']").length;
createLightbox(lightbox);

$(".tix-lightbox-close").click(function(e){
closeLightbox();
closeOverlay();
});//.tix-lightbox-close

});


};

})(jQuery);	
