(function($){
 var TixSidebar = function(element, options)
   {
   
      var sidebar = $(element);
   		var obj=this;
var sidebarW=sidebar.outerWidth(),sidebarH=sidebar.outerHeight();
var body=$("body");
var bodyW=body.width();

var defaults={
direction:'left'
};
var options = $.extend(defaults, options);

//returns true if sidebar is open else false
this.tixsidebar_isOpen=function(){
if(sidebar.hasClass("sidebartoggle")){return true;}else{return false;}
}

//show sidebar

this.tixsidebar_show=function(){
if(sidebar.hasClass("sidebartoggle")){return false;}

body.css({position:"absolute",width:bodyW+"px"});

if(options.direction=="left"){

sidebar.css({left:-sidebarW + "px",right:'auto'});

body.stop().animate({
left:sidebarW + "px"
},
{duration:500,
step:function(now,fx){
if(now>0 && now<sidebarH/10){
sidebar.show().stop().animate({left:0},500);
}
},
}


);

}

if(options.direction==="right"){

sidebar.css({right:-sidebarW + "px",left:'auto' });
body.stop().animate({
left:-sidebarW + "px"
},
{duration:500,
step:function(now,fx){
if(now<0 && now > (-sidebarH)/10){
sidebar.show().stop().animate({right:0},500);
}
},
}


);
}

sidebar.addClass("sidebartoggle");

};

//hide sidebar

this.tixsidebar_hide=function(){
sidebar.removeClass("sidebartoggle");
body.css({position:'inherit',top:0,left:0,right:0});
if(options.direction==="left"){
sidebar.css({left:-sidebarW + "px"}).hide();
}else{
sidebar.css({right:-sidebarW + "px"}).hide();
}
};

//toggle sidebar
this.tixsidebar_toggle=function(){
if(sidebar.hasClass("sidebartoggle")  ){
obj.tixsidebar_hide();
}else{
obj.tixsidebar_show();
}

}


   
   };
   

         $.fn.tixsidebar = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixsidebar')) return;

           // pass options to plugin constructor
           var tixsidebar = new TixSidebar(this, options);

           // Store plugin object in this element's data
           element.data('tixsidebar', tixsidebar);
       });
	  
   };
   

   
   
})(jQuery);	