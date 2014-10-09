(function($){
$.fn.tixaccordion=function(){
$(".accordion").each(function(){
var accordion=$(this);
accordion.find("a.panel").click(function(e){
var panel=$(this);
e.preventDefault();
accordion.find("div.content").slideUp("fast");
panel.closest("li").find("div.content").slideDown("slow");
return false;
});

});


};

})(jQuery);	
