(function($){
   var TixSelect = function(element, options)
   {
   var select = $(element);
   var tixobj;
   var selected;
	var next;
	var prev;
	var active_results;
	var obj=this;
	var select_name=select.attr("name");
	var defaults = {
				collapse:false
				
                
            };
     
// Extend our default options with those provided.
 options = $.extend(defaults, options);
 //if(select.not('select')){ return false;} //if element is not select return
 
 var tixcls="tixselect_"+select_name;

  //event handling
 
  var tixselect_addOptions=function(){
  
    select.find(">option").each(function(i){

	var val_="";
  var text_="";
  val_=$(this).attr("value");
  text_=$(this).html();
  tixobj.find("ul").append("<li data-val='"+ val_ + "'>" +text_+"</li>");

  });
  
  
 
  tixobj.find("span.caption,.downarrow").on('click',function(e){
  e.preventDefault();
 e.stopPropagation();
if(tixobj.find('.wrapper').hasClass('shown')){
tixselect_hide(select_name);
tixselect_hideAll();
}else{
tixselect_hideAll();
tixselect_show();
}

 
 });
 
 /*
 tixobj.find(".downarrow").on('click',function(e){
 tixselect_hideAll();
 e.preventDefault();
  e.stopPropagation();
 tixselect_show();
 });*/
 
 
 tixobj.find("ul>li").on('click',function(e){
 e.preventDefault();
  e.stopPropagation();
tixselect_highlight($(this));
 });
 
 }
 
 

   
this.tixselect_update=function(){
tixobj.find("li").remove();
 tixselect_addOptions();
 tixobj.css({width:select.width() + "px"});
}   
 
var tixselect_select=function(type,val_){
switch(type){
case 'value':
select.val(val_);
break;
case 'html':
select.find("option[text=" + val_ + "]").attr("selected", true);
break;
}

}

var tixselect_hide=function(select_name){
var s="tixselect_"+select_name;
var wrapper=$("."+s).find(".shown");;
var arrow=wrapper.closest(".tixselect").find(".downarrow i");
arrow.removeClass("fa-angle-up").addClass("fa-angle-down");
wrapper.find(".tixselect_search").val("");
wrapper.removeClass("shown").hide();
};

var tixselect_hideAll=function(){
/*
$(".tixselect").each(function(i){
var s=$(this);
console.log(i);
console.log(tixcls);
if(s.hasClass(tixcls) && s.hasClass("shown")){
}else{
s.find(".wrapper").removeClass("shown").hide();
s.find(".tixselect_search").val("");
s.find(".downarrow i").removeClass("fa-angle-up").addClass("fa-angle-down");
}

});
*/
var wrapper=$(".tixselect").find(".shown");;
var arrow=wrapper.closest(".tixselect").find(".downarrow i");
arrow.removeClass("fa-angle-up").addClass("fa-angle-down");
wrapper.find(".tixselect_search").val("");
wrapper.removeClass("shown").hide();

}

var tixselect_highlight=function(item){
 var val_=item.attr("data-val");
 var text_=item.text();
 var arrow=tixobj.find(".downarrow i");
 if(val_ !== undefined || val_!==""){
 tixselect_select("value",val_);
 }else{
 tixselect_select("html",text_);
 }
 tixobj.find("span.caption").text(text_);
  tixobj.find("ul>li").show().removeClass("selected");
 tixobj.find(".tixselect_search").val("");
 $(this).addClass("selected");
arrow.removeClass("fa-angle-up").addClass("fa-angle-down");
tixobj.find(".wrapper").hide().removeClass("shown");;
}

 
 
 var tixselect_show=function(){
 
 
  var wrapper=tixobj.find(".wrapper");
  
 var arrow=tixobj.find(".downarrow i");
 /*
  if(wrapper.hasClass("shown") && arrow.hasClass('fa-angle-up')){
  
 arrow.removeClass("fa-angle-up").addClass("fa-angle-down");
 wrapper.removeClass("shown").fadeOut("fast");
 }else{
 arrow.removeClass("fa-angle-down").addClass("fa-angle-up");
 wrapper.addClass("shown").fadeIn("fast");
 //select first item in the list if not already selected
 if(tixobj.find("li.selected").length<=0){
 tixobj.find("ul>li:first").addClass("selected");
 
 }
 }
 
 */
  arrow.removeClass("fa-angle-down").addClass("fa-angle-up");
 wrapper.addClass("shown").fadeIn("fast");
 //select first item in the list if not already selected
 if(tixobj.find("li.selected").length<=0){
 tixobj.find("ul>li:first").addClass("selected");
 
 }
   tixobj.find(".tixselect_search").focus();
 }
 

  var tixSelect_init=function(){

 select.after("<div class='tixselect "+tixcls+"'><span class='caption'>Select City</span><span><a href='#' class='downarrow'><i class='fa fa-angle-down'></i></a></span><div class='wrapper'><div class='search'><div class='input-wrapper'><div class='input-group'><div class='input-field'><input type='text' class='tixselect_search'/></div><div class='input-addon'><span class='fa fa-search'></span></div></div></div></div><ul class='plain list'></ul></div></div>");
 select.hide();
 tixobj=$("."+tixcls);
 tixselect_addOptions();
 tixobj.css({width:select.width() + "px"});
 tixobj.find(".wrapper").css({width:select.width() + "px"});
 if(options.collapse===true){tixselect_show();}
  }
 
   tixSelect_init();
 
 
$(document).on('click',function(e){
 tixselect_hideAll();
});
 
 
 
tixobj.find(".tixselect_search").click(function(e){
  e.stopPropagation();

});
 
 tixobj.keyup(function(e){
 e.stopPropagation();
    if ((e.keyCode || e.which) == 38)
    {   
	selected=tixobj.find("li.selected");
	if(selected.hasClass("first_result")){return false;}
	if(tixobj.find("li.active_results").length==0){
	prev=tixobj.find("li.selected").prevAll(":first");
	}else{
	prev=tixobj.find("li.selected").prevAll("li.active_results:first");
	}
  tixobj.find("li").removeClass("selected"); 

  prev.addClass("selected"); 
 
	return;
    }
    // down arrow
    else if ((e.keyCode || e.which) == 40){
	selected=tixobj.find("li.selected");
	if(selected.hasClass("last_result")){return false;}
	if(tixobj.find("li.active_results").length==0){
	next=tixobj.find("li.selected").nextAll(":first");
	}else{
	next=tixobj.find("li.selected").nextAll("li.active_results:first");
	}
 	tixobj.find("li").removeClass("selected"); 
  next.addClass("selected"); 
  
	  
return;
      
    }else if((e.keyCode || e.which) == 13){
	
tixselect_highlight(tixobj.find("li.selected"));
return false;
	}else{
	e.stopPropagation();
 var val_=tixobj.find(".tixselect_search").val().toLowerCase();
if (val_.length >0) {
  tixobj.find("ul>li").hide().filter(function () {
  var items=$(this).text().toLowerCase();
  
   $(this).removeClass("active_results");
  return items.indexOf(val_) != -1;
  }).show().addClass("active_results");
  tixobj.find("li").removeClass("selected");
  tixobj.find("li:visible").eq(0).addClass("selected").addClass("first_result");
  tixobj.find(".active_results:last").addClass("last_result");
return false;
 
}
else {
if($(".tixselect_search").val()==""){
   tixobj.find("ul>li").show().removeClass("selected").removeClass("active_results").removeClass("first_result").removeClass("last_result");
   tixobj.find("li").eq(0).addClass("selected");
  
  }else{
 tixobj.find("ul>li").removeClass("selected").removeClass("active_results").removeClass("first_result").removeClass("last_result");
 tixobj.find("ul").hide();
  }
}
	
	
	}
	
	
});


 
 
 
 };

      $.fn.tixselect = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixselect')) return;

           // pass options to plugin constructor
           var tixselect = new TixSelect(this, options);

           // Store plugin object in this element's data
           element.data('tixselect', tixselect);
       });
	  
   };
})(jQuery);	

