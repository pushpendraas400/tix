(function($){
$.fn.tixscrollTo=function(options){
var defaults={
speed:500,
element:'',
offset:0,
easing:'swing',
callback:function(){}
};

  // Extend our default options with those provided.
  var options = $.extend(defaults, options);
  var elem=options.element;
  
  var top=elem.position().top + options.offset;

 
  $("body,html").animate({scrollTop:top + "px"},options.speed,options.easing,function(){
   if(options.callback &&  typeof options.callback == 'function')
		{
		options.callback(undefined != arguments[0] ? arguments[0] : '');
		}
  
  });

};
})(jQuery);