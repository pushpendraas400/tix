(function($){
   var Tixnumber   = function(element, options)
   {
   var elem = $(element);
   
	var defaults = {
				interval:6000,
               	step:1
            };
			var handle;
	var number=parseInt(elem.text());
	
 options = $.extend(defaults, options);
 
 
function tixnumber_inView(obj)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(obj).offset().top;
    var elemBottom = elemTop + $(obj).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
} 

 

 
var tixnumber_random=function(max,min){
return Math.floor(Math.random() * (max - min + 1)) + min;
}


var tixnumber_spin=function(from,to){



elem.css({fake:0});

				elem.stop().animate({ fake:1  }, {
		        step: function(now,fx)
        {
		
		var t=parseInt(elem.text());
		
		
		if(t>=to){
		elem.removeClass("tixnumber");
		elem.text(number);
		 clearInterval(handle);
		return false;
		}
		from=from+options.step;
        elem.html(from);
        },duration:options.interval,
	
});
	 



}

var tixnumber_animate=function(){
if(elem.hasClass("tixnumber")){
var t=parseInt(elem.text());
if(t==0){
var rnd=tixnumber_random(number,1);
 tixnumber_spin(1,rnd);
}else{
var rnd=tixnumber_random(number,t);
tixnumber_spin(rnd,number);
}
}

}

var tixnumber_init=function(){
clearInterval(handle)
elem.text(0);
console.log(elem.offset().top + elem.outerHeight());
if(tixnumber_inView(elem)){
console.log("yes");
elem.addClass('tixnumber');
handle=setInterval(function(){tixnumber_animate();},1500); 
}
}
 

 

 
 $(window).scroll(function(){
 if(tixnumber_inView(elem)){
 elem.addClass('tixnumber');
handle=setInterval(function(){tixnumber_animate();},1500); 
}
});
 
 tixnumber_init();
 
 };

     $.fn.tixnumber = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixnumber')) return;

           // pass options to plugin constructor
           var tixnumber = new Tixnumber(this, options);

           // Store plugin object in this element's data
           element.data('tixnumber', tixnumber);
       });
	  
   };
})(jQuery);	

