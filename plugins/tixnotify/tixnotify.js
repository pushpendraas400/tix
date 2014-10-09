(function($){
$.fn.tixnotify=function(options){
	   var defaults=
					{
					message:'',
					sticky:false,
					stayInterval:8000,
					picture:null,
					title:'',
					showProgress:true
					
					};
				
var timers=[];
var prog=[];
var stayinterval=0;
var msgids=[];	
 options = $.extend(defaults, options);	
			var message_HTML="<div class='tixnotify_wrapper'><div class='tixnotify_title'>@title</div><span class='close'><a href='#' class='tixnotify_close'><i class='fa fa-times'></i></a></span><div class='row'><div class='tixnotify_picture col-onefourth'>@picture</div><div class='tixnotify_content col-threefourth'><p>@content</p></div><div class='tixnotify_progress "+options.progressType+"'></div></div>";		
				

				 var tixnotify_init=function(){
				 if($("ul.tixnotify").length==0){ $("body").append("<ul class='list plain tixnotify'></ul>");}
				
				 };
				 
				 function tixnotify_isImgValid(url,HTML){
					HTML = HTML || false;
					if(url==null || url==undefined){
						if(HTML==true) return "";
							if(HTML==false) return false;
							}

					var arr = new Array("jpeg", "jpg", "gif", "png");
					var rtn=false;
					var ext = url.substring(url.lastIndexOf(".")+1);
					if(jQuery.inArray(ext,arr)){
					
					rtn=true;
						}
						
					if(HTML==true && rtn==true){
					return "<img src='"+url+"' class='responsive_img' />";
					}
					if(HTML && rtn==false){return "";};
 
					if(HTML==false && rtn){return true;};
					if(HTML==false && rtn==false) {return false;}
	
					};
					
					
								function tixnotify_close_message(id){
								var li=$(".tixnotify").find("#"+id);
								var progress=li.find(".tixnotify_progress");
								var li_width=li.width();
								var progress_width=progress.width();
								if(progress_width<li_width && progress_width>0){
								progress.css({width:li_width + "px"});
									}
								window.clearInterval(prog[id]);
								window.clearInterval(timers[id]);
										li.fadeOut("slow",function(){
										li.remove();
										msgids.pop(li.attr("id"));
										});

								};
					
							
							
							
							 function tixnotify_showProgress(id,ind)
							{
				
									var li=$("ul.tixnotify").find("#"+id);
									var li_width=li.width();

									var li_timer=options.stayInterval*(ind+1);
									var sec=li_timer/100;
									
									
								if(li.length>0){
								

								var progress=li.find(".tixnotify_progress");
								
								var current_progress=progress.width();
								var p=li_width/sec;
								if(current_progress<li_width){
								progress.css({width:(current_progress+p)+"px"});
								}
							
								
								if(current_progress>=li_width){
										window.clearInterval(prog[id]);
										li.fadeOut("slow",function(){
										li.remove();
										msgids.pop(li.attr("id"));
										});
									}
									
									

								}
							
					
							};
					
				
				 var tixnotify_createMessage=function(){
				 message_HTML=message_HTML.replace("@content",options.message);
					 message_HTML=message_HTML.replace("@title",options.title);
					 message_HTML=message_HTML.replace("@picture",tixnotify_isImgValid(options.picture,true));
					
					var rnd=Math.random(1);
							var rndid="message"+Math.ceil(rnd*100000);
							msgids.push(rndid);
				 $(".tixnotify").prepend("<li id='"+rndid+"'>"+message_HTML+"</li>");
				 if(options.sticky==false){
				var ind=$(".tixnotify").find("li[id='"+rndid+"']").index();
				
						timers[rndid]=window.setInterval(function(){tixnotify_close_message(rndid);},options.stayInterval*(ind+1));
					
					if(options.showProgress==true){
				prog[rndid]=window.setInterval(function(){tixnotify_showProgress(rndid,ind);},100);
					}
					
					
					}
					//adjust classes if picture is absent
					if(options.picture==null || options.picture==undefined){
					$("#"+rndid).find(".tixnotify_picture").remove();
					$("#"+rndid).find(".tixnotify_content").addClass("col-1").removeClass("col-threefourth");
					}
					
					
				 
				 
				 		 $(".tixnotify_close").click(function(e){
				 e.stopPropagation();
				 e.preventDefault();
				 tixnotify_close_message($(this).closest("li").attr("id"));
				 });
				 
				 };
				 
		
				 
tixnotify_init();				 
tixnotify_createMessage();
};

})(jQuery);