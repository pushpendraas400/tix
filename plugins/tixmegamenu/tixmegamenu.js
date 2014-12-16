(function($){
   var Tixmegamenu   = function(element, options)
   {
   var elem = $(element);
   var ul=elem.find("ul.tixmegamenu");
   var li=ul.find(" > li ");
   var liWidth=0;
   var handle;
   
  	var defaults = {
			
				interval:700,
				threshold:700 
               	            };
 options = $.extend(defaults, options);							

 var tixmegamenu_hideAll=function(){
 ul.find(" > li").each(function(){
 var item=$(this);
var row=item.find('.menu-row:first');
if(row.is(":visible")){ row.css({visibility:'hidden',opacity:0});}
 });

 };
 
 var tixmegamobilemenu_init=function(){
  if($(window).width()<=options.threshold){
 ul.removeClass("tixmegamenu").addClass("tixmegamobilemenu");
 ul.find('.menu-row').css({width:$(window).width()+"px"});
 $("body").append("<div id='megamenuoverlay'><div class='overlay-menu'><a href='#' class='back'><i class='fa fa-chevron-left'></i>&nbsp;back</a></div><div class='menu-item'></div></div>");
 $("#megamenuoverlay").css({width:$(window).width()+"px",height:screen.height +"px"});
 }
 
  $(".back").on('click',function(e){
 e.preventDefault();
 $("#megamenuoverlay").hide();
 });
 
 
 };
 
 var tixmegamenu_init=function(){
 elem.css({position:'relative',display:'block'});
 ul.addClass("list").addClass("plain");
 li.each(function(){
 var menuitem=$(this);
 if(menuitem.find(".menu-row:first").length>0){
 menuitem.append("<i class='fa fa-angle-down'></i>");
 menuitem.addClass('dropdown');
 };
 });
 
tixmegamobilemenu_init();
 
  };
 
 tixmegamenu_init();
 
 ul.find(" > li ").click(function(){
 if(ul.hasClass('tixmegamobilemenu')){
 var item=$(this);
if(item.hasClass('dropdown')){
var row=item.find('.menu-row:first');
$("#megamenuoverlay .menu-item").html(row.html());
$("#megamenuoverlay").show();


}
 }
 
 });
 
 ul.find(" > li").mouseenter(function(){
 if(ul.hasClass('tixmegamenu')){
tixmegamenu_hideAll();


var item=$(this);
if(item.hasClass('dropdown')){
var pos=item.offset();
var posy=pos.top + ul.height();
var row=item.find('.menu-row:first');
var elemWidth=ul.outerWidth();

if(row.length>0){
row.css({position:'absolute',visibility:'visible',top:posy + "px"});
row.animate({opacity:1},options.interval);
}


}
}

}).mouseleave(function(){
 if(ul.hasClass('tixmegamenu')){
tixmegamenu_hideAll();
}
});
 

 
 $(window).on('resize',function(){
 tixmegamobilemenu_init();
 });
 
 };

     $.fn.tixmegamenu = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixmegamenu')) return;

           // pass options to plugin constructor
           var tixmegamenu = new Tixmegamenu(this, options);

           // Store plugin object in this element's data
           element.data('tixmegamenu', tixmegamenu);
       });
	  
   };
})(jQuery);	

