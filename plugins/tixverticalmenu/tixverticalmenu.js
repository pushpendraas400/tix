(function($){
$.fn.tixverticalmenu=function(){
$("ul.verticalmenu li.group").addClass("menu-close");
//collapse all menu items who have menu-open class
$("ul.verticalmenu li.menu-open").each(function(){
$(this).find("ul.menu-elements").css({display:"block"});
});
$("ul.verticalmenu .verticalmenu-label").each(function(){
var menu=$(this);
menu.click(function(e){
var group=$(this).closest(".group");
if(group.hasClass("menu-open"))
		{
		group.removeClass("menu-open").addClass("menu-close");
				
		}else
		{
		
		group.addClass("menu-open").removeClass("menu-close");
		}
		group.find(".menu-elements").toggle("slow");
		
		
		return false;
		
	});
});

$("ul.verticalmenu li.item a").each(function(){
var item=$(this);

item.click(function(e){
var href=$(this).attr("href");
var hash=href.substr(0,1);
if(hash=="#" && href.length>1){
e.preventDefault();
var id=href.substr(1);
  $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');

		$("ul.verticalmenu li.item").removeClass("selected");
		item.closest("li.item").addClass("selected");
		
}
});

});


};

})(jQuery);	

