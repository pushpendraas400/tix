(function($){
$.fn.tixdialog=function(options){
var chandle,dragging=false,coord= new Object(),ctop,cleft;
var defaults = {
   type: 'info', //can be window,alert,warning,error,info,confirm
   title: '', //title of the dialog
   content: '',//message or content 
   showIcon:true,//whether to icons beside message
   confirmCallback:function(){},
   confirmCancelCallback:function(){},
   position:'center', //can be center,top,bottom,top left,bottom left, top right, bottom right,center left, center right
   effect:'slide', //can be fade,slide
    
   showTitleBar:true,//true:show title bar false: hide title bar
   showButtons:true,//true: show buttons false:hide buttons
   showOverlay:true,//true: show overlay in background
   closeKey:true,// true: use esc key from keyboard to close dialog
   closeOverlay:true,//true: close dialog on clicking overlay
   animationSpeed:300,
   draggable:true,
   buttonClass:'button-alt',
   confirmButtonClass:'button-alt-success',
   successButtonClass:'button-alt-success',
   okButtonClass:'button-alt-primary',
   cancelButtonClass:'button-alt-danger'
   };

  // Extend our default options with those provided.
  var options = $.extend(defaults, options);
  var HTML="<div id='tixdialog'>" +
			"<div class='tixdialog_header'>"+
			"<div class='tixdialog_title'>@title</div>"+
			"<div class='tixdialog_close'><a href='#' class='tixdialog_close'><i class='fa fa-times'></i></a></div>"+
			"</div>"+
			"<div class='tixdialog_body'>"+
			"<div class='tixdialog_icon'>@icon</div>"+
			"<div class='tixdialog_content'>@content</div>"+
			"</div>"+
			"<div class='tixdialog_footer'>"+
			"<ul class='plain list footer_op'>@buttons</ul>"+
			"</div>"+
			"</div>";
			
		var tixdialog_createOverlay=function(){
		var screen_width=screen.width;
		var screen_height=$(document).height();
		
		var bk="<div id='tixdialog_overlay' style='width:" + screen_width + "px;height:" + screen_height + "px;' class='tixdialog_overlay'></div>";
			if($("#tixdialog_overlay").length==0)
				{
					$("body").append(bk);
	
				}
				$("#tixdialog_overlay").show();
				
			}
	//create a button from button object	
	var tixdialog_createButton=function(button){
	var t;
	if(button.hasOwnProperty('buttonCaption')){t=button.buttonCaption;}
	else{ t=button.buttonHTML;}
	
	var buttonHTML="<a href='#' class='"+options.buttonClass+ " " + button.buttonClass +"'>"+t+"</a>";
	return buttonHTML;
	}	
	/**************************/
	
	var tixdialog_setPosition=function(position){
	
    //calcualte left and top for the dialog box according to user supplied values for position and effect paarameters
	var dleft,dtop;
	var dialog=$('#tixdialog');
	var dialogW=$("#tixdialog").outerWidth(),dialogH=$("#tixdialog").outerHeight();
	var windowW=$(window).width(),windowH=$(window).height();
	
	dleft= (windowW - dialogW ) / 2+$(window).scrollLeft();
	switch(position){
	case 'top':
	dtop=0;
	break;
	case 'bottom':
	dtop=(windowH - dialogH) + $(window).scrollTop();
	break;
	case 'top right':
	dleft= windowW - dialogW +$(window).scrollLeft();
	dtop=0;
	break;
	case 'top left':
	dleft= 2;
	dtop=0;
	break;
	case 'bottom left':
	dleft= 2;
	dtop=(windowH - dialogH);
	break;
	case 'bottom right':
	dtop=(windowH - dialogH);
	dleft= windowW - dialogW;
	break;
	case 'center left':
	dtop=((windowH - dialogH)/2);
	dleft= 2;
	break;
	case 'center right':
	dtop=((windowH - dialogH)/2) + $(window).scrollTop();
	dleft= windowW - dialogW ;
	break;
	default:
	dtop=((windowH - dialogH)/2) ;

	}
	
	
		if(options.effect=="fade")
			{
			dialog.css({top:dtop+"px",left:dleft+"px",display:'none'});
			dialog.fadeIn("slow");
			}
			else if(options.effect=="slide")
			{
			if((options.position).indexOf("center")>=0|| (options.position).indexOf("top")>=0)
				{
				dialog.css({"top":-dialogH+10,'display':'block',left:dleft+"px"});
				}

			if((options.position).indexOf("bottom")>=0)
			{
			dialog.css({"top":windowH+10 + "px",'display':'block',left:dleft+"px"});
			}

			dialog.css({"display":"block",left:dleft+"px"}).animate({top:dtop},options.animationSpeed);

			}
			else if(options.effect=="slide left")
			{
			dialog.css({"left":screen.width,'display':'block',top:dtop+"px"});
			dialog.css("display","block").animate({left:dleft},options.animationSpeed);
			}
			else if(options.effect=="slide right")
			{
			dialog.css({"left":-dialogW,'display':'block',top:dtop+"px"});
			dialog.css("display","block").animate({left:dleft},options.animationSpeed);
			}
	

	
	}
	
	/*******************************/
	//make some ajustments according to paramters passed
	var tixdialog_adjust=function(){
	var dialog=$("#tixdialog");
	if(options.showTitleBar==false){dialog.find(".tixdialog_title").remove();}
	if(options.showButtons==false || options.type=="window"){dialog.find(".footer_op").remove();}
	if(options.Showicon==false || options.type=="window"){dialog.find(".tixdialog_icon").remove();}
	
	
	}
	/***********************************/
	
	var tixdialog_closeOverlay=function(){
	var overlay=$("#tixdialog_overlay");
	overlay.fadeOut("fast",function(){overlay.remove();})
	}
	
	/***************************************/
	
	var tixdialog_close=function(){
	var dialog=$("#tixdialog");
	var dialogH=dialog.height(),dialogW=dialog.width();
	var windowH=$(window).height(),windowW=$(window).width();
	if(options.effect=="slide")
		{
		if((options.position).indexOf("center")>=0|| (options.position).indexOf("top")>=0)
		{

		dialog.css("display","block").animate({top:-(dialogH+10)},options.animationSpeed).fadeOut("slow",
		function(){
		dialog.remove();
		}
		);
		}

		if((options.position).indexOf("bottom")>=0)
		{
		dialog.css("display","block").animate({top:windowH+dialogW},options.animationSpeed).fadeOut("slow",
		function(){dialog.remove();}
		);
		}
		}else if(options.effect=="slide left")
		{
		dialog.css("display","block").animate({left:windowW+(dialogW+10)},options.animationSpeed).fadeOut("slow",function(){dialog.remove();});
		}
		else if(options.effect=="slide right")
		{
		dialog.css("display","block").animate({left:-(dialogW+10)},options.animationSpeed).fadeOut("slow",function(){dialog.remove();});
		}
		else
		{
		dialog.fadeOut("slow",function(){dialog.remove();});
		}
		
	tixdialog_closeOverlay();
		
	}
	
	/***********************************/
	var tixdialog_autoClose=function(){
	tixdialog_close();
	window.clearInterval(chandle);
	}
	
	/*****************************/
	
	//create dialog
	var tixdialog_createDialog=function(type){
	 HTML=HTML.replace("@content",options.content);
	 HTML=HTML.replace("@title",options.title);
	 var buttons=new Object();
	 var btn;
	switch(type){
	case 'info':
	if(options.showIcon==true){HTML=HTML.replace("@icon","<i class='fa fa-info-circle'></i>");}
	buttons.buttonClass="btnok "+options.okButtonClass;
	buttons.buttonCaption="Ok";
	btn=tixdialog_createButton(buttons);
	HTML=HTML.replace("@buttons","<li class='left'>"+btn+"</li>");
	break;
	case 'warning':
	case 'alert':
	if(options.showIcon){HTML=HTML.replace("@icon","<i class='fa fa-warning'></i>");}
	buttons.buttonClass="btnok "+options.okButtonClass;
	buttons.buttonCaption="Ok";
	btn=tixdialog_createButton(buttons);
	HTML=HTML.replace("@buttons","<li class='left'>"+btn+"</li>");	
	break;
	case 'success':
	if(options.showIcon){HTML=HTML.replace("@icon","<i class='fa fa-check'></i>");}
	buttons.buttonClass="btnclose "+options.successButtonClass;
	buttons.buttonCaption="Close";
	btn=tixdialog_createButton(buttons);
	HTML=HTML.replace("@buttons","<li class='left'>"+btn+"</li>");
	break;
	case 'confirm':
	
	if(options.showIcon){HTML=HTML.replace("@icon","<i class='fa fa-check-square-o'></i>");}
	buttons.buttonClass="btnconfirm "+options.successButtonClass;
	buttons.buttonCaption="Confirm";
	btn="<li class='left'>"+tixdialog_createButton(buttons)+"</li>";
	buttons.buttonClass="btncancel "+options.cancelButtonClass;
	buttons.buttonCaption="Cancel";
	btn+="<li class='left'>"+tixdialog_createButton(buttons)+"</li>";
	
	HTML=HTML.replace("@buttons",btn);
	break;
	case 'error':
	if(options.showIcon){HTML=HTML.replace("@icon","<i class='fa fa-bug'></i>");}
	buttons.buttonClass="btnok "+options.okButtonClass;
	buttons.buttonCaption="Ok";
	btn=tixdialog_createButton(buttons);
	HTML=HTML.replace("@buttons","<li class='left'>"+btn+"</li>");	
	break;
	}
	$("body").append(HTML);
	tixdialog_adjust();
	tixdialog_setPosition(options.position);
	
	//event handling
	$("#tixdialog_overlay").click(function(e){
	e.stopPropagation();e.preventDefault();
	if(options.closeOverlay==true){
	tixdialog_autoClose();
	}
	});
	
	$(".tixdialog_close,.btnok,.btncancel").click(function(e){
	e.stopPropagation();e.preventDefault();
	tixdialog_autoClose();
	if(options.type=="confirm"){
	if(options.confirmCancelCallback &&  typeof options.confirmCancelCallback == 'function')
		{
		options.confirmCancelCallback(undefined != arguments[0] ? arguments[0] : '');
		}
	}
	});
	
	$(".btnconfirm").click(function(e){
	e.stopPropagation();e.preventDefault();
	  if(options.confirmCallback &&  typeof options.confirmCallback == 'function')
		{
		options.confirmCallback(undefined != arguments[0] ? arguments[0] : '');
		}
		tixdialog_autoClose();
	});
	
	//keypress event handling
	//close dialog on pressing 'esc' key if closeKey property is set to 'true'
	$(document).keydown(function(e){
	e.stopPropagation();
	//e.preventDefault();
	//works only when dialog is shown
	if($("#tixdialog").is(":visible"))
		{
		var code = (e.keyCode ? e.keyCode : e.which);
		switch(code)
		{
		case 27: //escape key
		if(options.closeKey==true)
		tixdialog_autoClose();
		break;
		}
		}
		});
	//dragging
	if(options.draggable)
	{
	$("#tixdialog .tixdialog_title").on('mousedown',function(e) {
	coord={
		oleft:$("#tixdialog").position().left,
		otop:$("#tixdialog").position().top,
		ox: (e.pageX || e.screenX),
		oy: (e.pageY || e.screenY)
		};
		e.preventDefault();
		dragging = true;
		});


		$(document).mouseup(function(e) {
		dragging = false;
		$("body").css("cursor", "default");

		});

		$(document).mousemove(function(e) {

		if(dragging) {
		$("body").css("cursor", "move");
		cleft=coord.oleft + (e.pageX || e.screenX) - coord.ox;
		ctop=coord.otop + (e.pageY || e.screenY) - coord.oy;
		$("#tixdialog").css("left",cleft + "px");
		$("#tixdialog").css("top",ctop + "px");
		}
		});

	}
	
	}	

	
	
	tixdialog_createOverlay();
	tixdialog_createDialog(options.type);
	
	
	
};

})(jQuery);