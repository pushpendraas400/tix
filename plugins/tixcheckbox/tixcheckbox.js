$.fn.tixcheckbox=function(options){
var defaults={
theme:'theme1'//can be theme2,theme3,theme4,theme5
};
 options = $.extend(defaults, options);
 
 var theme_class='';
 var theme_class_checked='';
 
 function tixcheckbox_theme(theme){
 switch(theme){
 case 'theme1':
 theme_class='fa-square-o';
 theme_class_checked='fa-check-square';
 break;
 case 'theme2':
 theme_class='fa-square-o';
 theme_class_checked='fa-check-square-o';
 break;
 case 'theme3':
 theme_class='fa-circle-o';
 theme_class_checked='fa-check-circle';
 break;
 case 'theme4':
  theme_class='fa-circle-o';
 theme_class_checked='fa-check-circle-o';
 break;
 case 'theme5':
  theme_class='fa-circle-o';
 theme_class_checked='fa-circle';
 break;
 default:
 theme_class='fa-square-o';
 theme_class_checked='fa-check-square';
 }
 
 }
 tixcheckbox_theme(options.theme);
 
 
 
return $(".tixcheckbox").each(function()
       {
	    var element = $(this);
		var checkbox_class="fa "+theme_class;
		var label=element.find("label");
		var label_class="";
		var checkbox=element.find("input[type='checkbox']");
		
		
		
	   checkbox.hide();
	   
	   if(checkbox.is(':disabled')){
	   checkbox_class+=" disabled";
	   label_class+="disabled";
	   }
	   
	   if(checkbox.is(":checked")){
	   checkbox_class+=" checked";
	   }
	   label.hide();
	   
	   
	   element.append("<span class='"+checkbox_class+"'></span><label class='tixcheckbox_label "+label_class+"'>"+label.html()+"</label>"); 
	   var spn=element.find("span.fa");
	   if(spn.hasClass("checked")){
	   spn.removeClass(theme_class).addClass(theme_class_checked);
	   }
	   
	   //event handling
	   element.find("span.fa,label.tixcheckbox_label").click(function(e){
	   e.stopPropagation();
	   e.preventDefault();
		
	   var chk;
	   if($(this).is('label')){ chk=$(this).closest('.tixcheckbox').find("span.fa");}
	   else{chk=$(this);}
	  
	   
	   var inp=element.find("input[type='checkbox']");
	   if(chk.hasClass('disabled')){ return false;}
	  if(chk.hasClass('checked')){
	  chk.removeClass('checked').removeClass(theme_class_checked).addClass(theme_class);
	  if(inp.is(":checked")){
	  inp.prop("checked","");
	  }
	  }else{
	  inp.prop("checked");
	  chk.addClass('checked').addClass(theme_class_checked).removeClass(theme_class);
	  }
	  
	   });
	   
	   
	   });



};