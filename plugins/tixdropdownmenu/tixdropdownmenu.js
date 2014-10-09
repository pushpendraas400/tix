(function($){
function closeAllMenu(){
$(".dropdown-menu ul.menu").hide();
$(".dropdown-menu").removeClass("open");
}
$.fn.tixdropdown=function(){
$(".dropdown-menu").each(function(){
var menu=$(this);
menu.find(".menu-toggle").click(function(e){
e.preventDefault();
var menu_height=$(this).outerHeight();
closeAllMenu();//close all open menu first
menu.find("ul.menu").css({top:menu_height + "px"}).show();
menu.closest(".dropdown-menu").addClass("open");
return false;
});


});

$('body').click(function(e){
closeAllMenu();
});


};

})(jQuery);	
