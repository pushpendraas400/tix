(function($){
   var Tixtimepicker   = function(element, options)
   {
   var elem = $(element);
   var val;
   var timepicker;
   var inputHour,inputMinute,inputMeridiem;
   var mm=new Array("AM","PM");
   var elem_name=elem.attr("name");
   var elem_id="#tixtimepicker_"+elem_name;
	var defaults = {
				hour:12,
				minute:0,
				meridiem:"AM",
				minuteStep:15,
				topOffset:2
                
            };
 options = $.extend(defaults, options);
  
 var tixtimepicker_init=function(){
var html="<div class='tixtimepicker' id='tixtimepicker_"+elem_name+"'>" + 
		 "<div class='row'>"+
		
"<div class='col-4 chour'>"+
"<ul class='list plain'>"+
"<li><a class='hourup' href='#'><i class='fa fa-angle-up'></i></a></li>"+
"<li><input type='text' class='input-hour' maxlength='2'/></li>"+
"<li><a class='hourdown' href='#'><i class='fa fa-angle-down'></i></a></li>"+
"</ul>"+
"</div>"+

"<div class='col-5 filler'>"+
"<ul class='list plain'>"+
"<li class='filler'>&nbsp;</li>"+
"<li class='filler'><label>:</label></li>"+
"<li class='filler'>&nbsp;</li>"+
"</div>"+

"<div class='col-4 cminute'>"+
"<ul class='list plain'>"+
"<li><a href='#' class='minuteup'><i class='fa fa-angle-up'></i></a></li>"+
"<li><input type='text' class='input-minute' maxlength='2'/></li>"+
"<li><a href='#' class='minutedown'><i class='fa fa-angle-down'></i></a></li>"+
"</ul>"+
"</div>"+


"<div class='col-4 meridiem'>"+
"<ul class='list plain'>"+
"<li><a href='#' class='meridiemup'><i class='fa fa-angle-up'></i></a></li>"+
"<li><input type='text' class='input-meridiem' maxlength='2'/></li>"+
"<li><a href='#' class='meridiemdown'><i class='fa fa-angle-down'></i></a></li>"+
"</ul>"+
"</div>"+



"</div>"+

"<div class='row'>"+
"<div class='col-1'>"+
"<ul class='list plain'><li class='right'><a class='button-alt button-alt-primary ok rect-40' href='#'><i class='fa fa-check'></i></a></li><li class='right'><a class='button-alt button-alt-danger cancel rect-40' href='#'><i class='fa fa-times'></i></a></li></ul>"+
"</div>"+
"</div>"+

"</div>";
if($(elem_id).length==0){
$("body").append(html);
}

elem.css({"text-transform":"uppercase"});
timepicker=$(elem_id);
inputHour=timepicker.find(".input-hour");
inputMinute=timepicker.find(".input-minute");
inputMeridiem=timepicker.find(".input-meridiem");


		
}
 tixtimepicker_init();
 
 //if minute is single digit ex: 2 make it two digit ex: 02
 var tixtimepicker_adjustMinutes=function(){
 if(inputMinute.val().length==1){
 inputMinute.val("0"+inputMinute.val());
 }
 }
 
 //open timepicker
 var tixtimepicker_open=function(){
  var pos=elem.offset();
 var height=elem.outerHeight();
 var top=pos.top + height + options.topOffset;
 
 var left=pos.left;
val=elem.val().trim();
 timepicker.css({top:top+"px",left:left+"px"});
 timepicker.show();
   if(val=="" || typeof val=="undefined"){

timepicker.find(".input-hour").val(options.hour);
timepicker.find(".input-minute").val(options.minute);
timepicker.find(".input-meridiem").val(options.meridiem);

}
 
 tixtimepicker_adjustMinutes();
 
 }
 //close timepicker
 var tixtimepicker_close=function(){
//timepicker.find(".input-hour,.input-minute,.input-meridiem").val("");
 timepicker.fadeOut("fast");
 }
 
 //on textbox click open timepicker
 elem.on('click',function(e){
e.preventDefault();
 e.stopPropagation();
  tixtimepicker_open();
 });
 
 //if user has used tix's form append or prepend input icon,make sure their click event opens picker 
 elem.closest(".input-wrapper").find("i,span,a").on('click',function(e){
 e.preventDefault();
 e.stopPropagation();
 tixtimepicker_open();
 });
 
 var tixtimepicker_allowNumeric=function(obj,e){
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
 };
 
 
 //all event handling goes here
 timepicker.find(".input-minute,.input-hour").keydown(function(e){
 tixtimepicker_allowNumeric($(this),e);
 });

 timepicker.find("a,input,div,span").on('click',function(e){
 e.stopPropagation();
 });
 
timepicker.find(".input-minute,.input-hour,.input-meridiem").focusout(function(e){
 e.preventDefault();
 var inp=$(this);
 var val=inp.val().toUpperCase().trim();
 inp.val(val);
 var t=0;
 
 if(inp.hasClass('input-minute')){
 t=parseInt(val);
 if(t>60 || t<0){inp.val("00");}
  }
 if(inp.hasClass('input-hour')){
 t=parseInt(val);
 if(t>12 || t<1){inp.val("12");}
  }
 
 if(inp.hasClass("input-meridiem")){

if(jQuery.inArray(val, mm)==-1){inp.val(options.meridiem);}

 }
 
 tixtimepicker_adjustMinutes();
 
 });
 
 //click event for meridiem up and down arrows
 timepicker.find("a.meridiemup,a.meridiemdown").click(function(e){
 e.preventDefault();
 e.stopPropagation();
 var t=inputMeridiem.val();
 var v;
 if(t=="" || typeof t=="undefined"){ v=options.meridiem;}
 else if(t=="AM" || t=="am"){v="PM";}
 else{v="AM";}
 
 inputMeridiem.val(v);
 
 });
 
 //click event for hour up and down arrows
 timepicker.find("a.hourup,a.hourdown").click(function(e){
 e.preventDefault();
 var t=parseInt(inputHour.val());
 var link=$(this);
 if(link.hasClass("hourup")){
 t++;
 }
 if(link.hasClass("hourdown")){
 t--;
 }
 if(t>12){t=1;}
 if(t<1){t=12;}
 inputHour.val(t);
 
 });
 
 //click event for minute up and down arrow
  timepicker.find("a.minuteup,a.minutedown").click(function(e){
 e.stopPropagation();
 e.preventDefault();
 var t=parseInt(inputMinute.val());
 var link=$(this);
 var n;
 var mod=t%options.minuteStep;
 if(t<0){t*=-1;}
 
 if(link.hasClass("minuteup")){
 if(mod==0){
 t+=options.minuteStep;
 }else{
 n=options.minuteStep-mod;
 t+=n;
 }
 
 }
 if(link.hasClass("minutedown")){
  if(mod==0){
  if(t==0){
 t=60-options.minuteStep;
 }else{
 t-=options.minuteStep;
 }
 }else{
 
 t-=mod;
 }

 
  
  }
  if(t>=60){t=0;}
  inputMinute.val(t);
  tixtimepicker_adjustMinutes();
 
  });
  
 //cancel button 
 timepicker.find("a.cancel").click(function(e){
 //e.stopPropagation();
 e.preventDefault();
 tixtimepicker_close();
}); 

//ok button  
 timepicker.find("a.ok").click(function(e){
 //e.stopPropagation();
 e.preventDefault();
 elem.val(inputHour.val() + ":" + inputMinute.val() + " " + inputMeridiem.val());
 tixtimepicker_close();
}); 

//close picker on document click if date is valid close it else reset textbox with default values and close the picker

$(document).click(function(e){
if(timepicker.is(":visible")){
var rtn=tixtimepicker_validateTime();
if(rtn.valid==true){
 tixtimepicker_close();
 }
 else{
 elem.val(options.hour + ":" + options.minute + " " + options.meridiem);
 tixtimepicker_close();
 }
 }
});


//it validates the textbox (elem) text for valid time.
//for this it checks for two digits seperated by : and AM OR PM seperated by space    
tixtimepicker_validateTime=function(){
var rtn=new Object();
rtn.valid=false;
var v=elem.val().trim();
var split=v.split(" ");
 
 if(split.length==2){
 var t=split[0];
 var m=split[1];
 m=m.toUpperCase();
  //must have : and AM OR PM
if(t.indexOf(":")>=0 && jQuery.inArray(m, mm)!=-1)
{
 var num=t.split(':');
 var minute_=num[1];
 var hour_=num[0]

 if(!isNaN(minute_) && !isNaN(hour_)){
  minute_=parseInt(minute_);
 hour_=parseInt(hour_);
 if(minute_<0 || minute_>60){minute_=60;}
 if(hour_<0 || hour_>12){hour_=0;}
 rtn.valid=true;
 rtn.hour=hour_;
 rtn.minute=minute_;
 rtn.meridiem=m;
 
 
 }
 
 
 
 }

}	
return rtn;
	
}

 //keyup event for textbox (elem)
 elem.keyup(function(){
 var t=tixtimepicker_validateTime();
 if(t.valid==true){
 inputHour.val(t.hour);
 inputMinute.val(t.minute);
 inputMeridiem.val(t.meridiem);
 tixtimepicker_adjustMinutes();
 tixtimepicker_close();
 }
 

 });
 
 
 };

     $.fn.tixtimepicker = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixtimepicker')) return;

           // pass options to plugin constructor
           var tixtimepicker = new Tixtimepicker(this, options);

           // Store plugin object in this element's data
           element.data('tixtimepicker', tixtimepicker);
       });
	  
   };
})(jQuery);	

