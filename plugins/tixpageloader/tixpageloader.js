(function($){
var ajaxrequest=false;
$(document).ajaxStart(function(){
ajaxrequest=true;
});

function tixpageloader_theme2(percent){
$("body").find("#vprogressbar").css({height:percent + "%"});
$("body").find("#vpercent span").text("").text(Math.floor(percent) + " % ");
}

function tixpageloader_theme1(percent){
$("#loadingbar").width(percent + "%");
}

function tixpageloader_reset_progress(){
$("#overlay,#pageloading").fadeOut("slow",function(){
$("#vprogressbar").fadeOut("slow");
$("#vpercent").fadeOut("slow");
});
$("#loadingbar").fadeOut("fast");
}

function tixpageloader_split(str,obj){
for(var i=0;i<str.length;i++){
obj.append("<div class='letter'>"+str.substring(i,i+1)+"</div>");
}
}

function tixpageloader_refresh(handle){
$("#vpercent .refresh-message").fadeIn("fast");
clearInterval(handle);
}


$.fn.tixpageloader=function(options){
var handle;
var imgs=$("body").find("img");
var rnd=30 + Math.random()*60;
var pgwidth=0;
var imgcount=imgs.length;
var incr=rnd/imgcount;
var loaded=0;

var defaults = {
		theme:'theme1',
		waitText:"loading"
				};
		var options = $.extend(defaults, options);	
			switch(options.theme){
			case 'theme1':
			if ($("#loadingbar").length === 0) {
			 $("body").append("<div id='loadingbar'></div>");
			 $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));
			 }
			break;
			case 'theme2':
			$("body").append("<div id='pageloading'><div id='vprogressbar'></div><div id='vpercent'><span></span><div class='refresh-message'><p class='text-center'>Page taking too much time to load? <a href='#' class='refresh' onclick='location.reload()' >RELOAD</a> the page<p class='text-center'>OR</p><p class='text-center'><a href='#' class='skip-loading' >SKIP</a> loading process.</p></p></div><div id='waittext'></div></div></div>");
		
			tixpageloader_split(options.waitText,$("#waittext"));
			
			break;
			default:
			if ($("#loadingbar").length === 0) {
			 $("body").append("<div id='loadingbar'></div>");
			 $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));
			 }
			};


imgs.each(function(i){
var img=new Image();
img.onload=function(){
pgwidth=pgwidth+incr;
switch(options.theme){
case 'theme1':
tixpageloader_theme1(pgwidth);
break;
case 'theme2':
tixpageloader_theme2(pgwidth);
break;
default:
tixpageloader_theme1(pgwidth);
}

loaded++;
if(loaded>=imgcount){

$(document).ajaxStop(function(){
tixpageloader_theme1(101);
tixpageloader_reset_progress();
tixpageloader_theme2(100);

});

if(ajaxrequest==false){
tixpageloader_theme1(101);
tixpageloader_theme2(100);
tixpageloader_reset_progress();

}
}

}
img.src=$(this).attr("src");


});			
	if(options.theme=="theme2"){
handle=setInterval(function(){tixpageloader_refresh(handle)}, 10000);
}	
	
$(".skip-loading").click(function(e){
e.preventDefault();
tixpageloader_reset_progress();
});
	
				};
})(jQuery);	