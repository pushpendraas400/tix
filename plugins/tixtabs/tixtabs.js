(function($){
$.fn.tixtab=function(options){

var defaults = {
				clickCallback:function(id){}
                
            };
     
// Extend our default options with those provided.
 options = $.extend(defaults, options);

function tixtabs_clickCallback(value_)
{
if(options.clickCallback &&  typeof options.clickCallback === 'function')
   {
   options.clickCallback(value_);
  }

}
 
function activateTab(id){
$(id).siblings(".tab-pane").hide();
$(id).show();
$(id).closest(".tabs").find(".nav li").removeClass("active");
$("a[href='"+id+"']").parent().addClass("active");
}

function tabActiveInit(){
var tabs=$(".tabs");
var activeLi=$(".tabs .nav li.active");
if(tabs.length>0 && activeLi.length>0){
console.log('adasdd');
activeLi.each(function(){
var id=$(this).find("a").attr("href");
activateTab(id);
});
}
else if (tabs.length>0){
tabs.each(function(){
$(this).find(".tab-pane").hide();
$(this).find(".tab-pane:first").show();
$(this).find(".nav li:first").addClass("active");
});
}
else{
}
}

tabActiveInit();

$(".tabs .nav li a").click(function(e){
e.preventDefault();
var tabs=$(this).closest(".tabs");
var id=$(this).attr("href");
activateTab(id);
tixtabs_clickCallback(id);
});

};

})(jQuery);	
