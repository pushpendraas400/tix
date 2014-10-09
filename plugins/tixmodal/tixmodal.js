(function ($) {
$.fn.tixmodal = function(options){

var defaults={
width:0,
height:0,
effect:'show', //can be show,fade,slide
action:'show' //action can be show or hide
};

var options = $.extend(defaults, options);

var elem=this;
var selector=elem.selector;

if(options.action=="hide"){closeModal(); return false;}

if(selector){  createOverlay(); showOverlay(); showModal(selector);} //if function is called using a selector show modal ex: $("#example").tixmodal()
//in above case elem.selector will be #example


function createOverlay(){
if($("body").find("#overlay").length==0){$("body").append("<div id='overlay'></div>");}

}
function showOverlay(){
$("#overlay").css({height:$(document).height() + "px"});
$("#overlay").show();
}
function closeOverlay(){
$("#overlay").hide();
}

function closeModal(){
$(".modal").fadeOut(function(){
closeOverlay();
});
$(selector).trigger('tixmodal.hidden'); //trigger hidden event
}

function showModal(id){
//trigger show event
$(selector).trigger('tixmodal.show');

var effect=options.effect;
var modal=$(id),modalw,modalh;
//if both options.width,options.height and attr data-width,data-height are provided modal will take data-width and data-height

if(options.width>0){modalw=options.width;}else{modalw=modal.outerWidth();}
if(options.height>0){modalh=options.height;}else{modalh=modal.outerHeight();}

if(modal.attr("data-width")){modalw=modal.attr("data-width");}else{modalw=modal.outerWidth();};
if(modal.attr("data-height")){modalh=modal.attr("data-height");}else{modalw=modal.outerHeight();};


var left=($(window).width() - modalw ) / 2+$(window).scrollLeft();
var top=20;

if(modal.hasClass("fade")){effect="fade";}
if(modal.hasClass("slide")){effect="slide";}
if(modal.hasClass("no-overlay")){}else{
createOverlay();
showOverlay();
}
modal.css({width:modalw + "px",left:left+"px",top:top+"%",position:'fixed'});
switch(effect){
case 'fade':
modal.fadeIn();
break;
case 'slide':
modal.css({top:-modalh-20 + "px",left:left + "px"}).show();
modal.animate({top:top + "%"},500);
break;
default:
modal.show();
}

$(selector).trigger('tixmodal.shown');
}
$(".modal-open").click(function(e){
e.preventDefault();
var modal_id=$(this).attr("href");
selector=modal_id;
showModal(selector);

});

$(".modal-close").click(function(e){
e.preventDefault();
closeModal();
});
};
})(jQuery);	
/* important: do not remove below code */
$(document).ready(function(){
$.fn.tixmodal();//do not remove this
});