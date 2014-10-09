$.fn.tixradiobutton=function(options){
var defaults={
theme:'theme1'//can be theme2,theme3
};
 options = $.extend(defaults, options);
 
 var theme_class='';
 var theme_class_checked='';
 
 function tixradiobutton_theme(theme){
 switch(theme){
 case 'theme1':
 theme_class='fa-circle-o';
 theme_class_checked='fa-dot-circle-o';
 break;
 case 'theme2':
 theme_class='fa-circle-o';
 theme_class_checked='fa-check-circle';
 break;
 case 'theme3':
 theme_class='fa-circle-o';
 theme_class_checked='fa-check-circle-o';
 break;
 case 'theme4':
  theme_class='fa-circle-o';
 theme_class_checked='fa-circle';
 break;
 case 'theme5':
 theme_class='fa-circle-o';
 theme_class_checked='fa-times-circle';
 break;
 case 'theme6':
  theme_class='fa-circle-o';
 theme_class_checked='fa-times-circle-o';
 break;
  case 'theme7':
  theme_class='fa-circle-o';
 theme_class_checked='fa-arrow-circle-o-right';
 break;
  case 'theme8':
  theme_class='fa-circle-o';
 theme_class_checked='fa-arrow-circle-right';
 break;
 default:
 theme_class='fa-circle-o';
 theme_class_checked='fa-dot-circle-o';
 break;
 }
 
 }
 tixradiobutton_theme(options.theme);
 
 
 
return $(".tixradiobutton").each(function()
       {
	    var element = $(this);
		var radio_class="fa "+theme_class;
		var label=element.find("label");
		var label_class="";
		var radio=element.find("input[type='radio']");
		
		
		
	   radio.hide();
	   
	   if(radio.is(':disabled')){
	   radio_class+=" disabled";
	   label_class+="disabled";
	   }
	   
	   if(radio.is(":checked")){
	   radio_class+=" checked";
	   }
	   label.hide();
	   
	   
	   element.append("<span class='"+radio_class+"' data-name='"+radio.attr("name")+"' data-value='"+radio.attr("value")+"' ></span><label class='tixradiobutton_label "+label_class+"'>"+label.html()+"</label>"); 
	   var spn=element.find("span.fa");
	   if(spn.hasClass("checked")){
	   spn.removeClass(theme_class).addClass(theme_class_checked);
	   }
	   
	   //event handling
	   element.find("span.fa,label.tixradiobutton_label").click(function(e){
	   e.stopPropagation();
	   e.preventDefault();
		
	   var chk;
	   
	   if($(this).is('label')){
	   chk=$(this).closest('.tixradiobutton').find("span.fa"); //find span
	      }
	   else{
	   chk=$(this);
	   
	   }
	   
		//remove class theme_class_checked from all span's having an attribute data-name set. data-name contains the name of radio button
		$("span[data-name='"+chk.attr("data-name")+"']").removeClass(theme_class_checked).addClass(theme_class) ;
		
		
	 if(chk.hasClass('disabled')){ return false;} //if radio button is disabled make span disabled also
	 chk.addClass(theme_class_checked).removeClass(theme_class);//add checked class graphic to clicked span
	 
	
		//get the radio button based to be checked from data-name attribute of clicked span
	   var inp=element.find("input[name='"+chk.attr("data-name")+"']" + "[value='"+chk.attr("data-value")+"']");
	   $("input[name='"+chk.attr("data-name")+"']").prop("checked",false);//make all radio buttons unchecked first
	   inp.prop("checked",true);//checked the clicked radio button
	  
	   });
	   
	   
	   });



};