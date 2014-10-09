(function($){
   var TixRangeSlider = function(element, options)
   {
   var rangeSlider = $(element);
   		var obj=this;
		var defaults = {
                min: 1,
                max: 100,
                step:0,
				width:0,
				decimal:false,
				inputID:'',
				callback:function(value_){
				},
				start:0,
				minHTML:'',
				maxHTML:'',
				append:'',
				prepend:'',
				stepIndicators:new Array()
				
                
            };
           
// Extend our default options with those provided.
 options = $.extend(defaults, options);
  rangeSlider.addClass("rangeslider");
  var dragging=false;	
var coord= new Object();	
var ctop,cleft,incr;
var knob;
var min=options.min;
var max=options.max;
var width_=options.width;
var inputName=options.inputID;
var currentValue=0;

var tixrangeslider_callback=function(value_)
{

if(options.callback &&  typeof options.callback === 'function')
   {
   options.callback(value_);
   }

}

var tixrangeslider_inputName=function(value_){
if(inputName){
rangeSlider.find("#"+inputName).val(value_);
}
}

//append prepend,stepindicators manipulation
var tixrangeslider_ap=function(value_){
var ap='';
var pp='';
if(options.stepIndicators.length==0){

if(options.append!=''){
ap=options.append;
}
if(options.prepend!=''){
pp=options.prepend;
}
return(ap+value_+pp);
}else{

return(options.stepIndicators[parseInt(value_/options.step)]);

}


}

var tixrangeslider_sliderValue=function(posx){
var value_=min + posx*incr;

if(options.decimal==false){

value_ = parseInt(value_);
}else
{
value_ = parseFloat(value_).toFixed(2);
}

tixrangeslider_callback(value_);
tixrangeslider_inputName(value_);
currentValue=value_;
return value_;
}


var tixrangeslider_knob=function(t){
var value_=tixrangeslider_sliderValue(t);
rangeSlider.find(".knob,.indicator").animate({left:t},500,
function(){
rangeSlider.find(".indicator").html(tixrangeslider_ap(value_)); 
rangeSlider.find(".highlighted").animate({width:t},20);
	}
		);
}


//public function to be called from outside. returns current value set for the slider

this.tixrangeslider_getVal=function(){
return currentValue;
}


var tixrangeslider_init=function(){
rangeSlider.html('').append('<span class="caption min"></span><span class="caption max"></span><span class="line"></span><span class="highlighted"></span><span class="knob"></span><span class="indicator"></span>');

if(options.minHTML!=''){rangeSlider.find('.min').html(options.minHTML);}else{rangeSlider.find('.min').html(min);}
if(options.maxHTML!=''){rangeSlider.find('.max').html(options.maxHTML);}else{rangeSlider.find('.max').html(max);}

knob=rangeSlider.find(".knob");
if(width_>0){
rangeSlider.css({width:(width_ + knob.width()) + "px"});
incr=(max-min)/width_;
}else{

incr=(max-min)/rangeSlider.width();
}
if(inputName){rangeSlider.append("<input type='hidden' name='"+inputName+"'" + "id='"+inputName+"'"+ ">");}

//if user has provided start value,then set it
if(options.start>0 && options.start>=min && options.start<=max){

var t= min + options.start/incr;
if(options.decimal==false){t=parseInt(t);}
tixrangeslider_knob(t);
}

}


tixrangeslider_init();







/* event handling */

rangeSlider.find(".line,.highlighted").click(function(e){
var t=parseInt(e.pageX-rangeSlider.position().left);

tixrangeslider_knob(t);

	});


rangeSlider.find(".knob").mousedown(function(e) {
coord={
oleft:$(this).position().left,
otop:$(this).position().top,
ox: (e.pageX || e.screenX),
oy: (e.pageY || e.screenY)
};
e.preventDefault();
dragging = true;
});	
	

rangeSlider.mouseup(function(e) {
dragging = false;

});


rangeSlider.mousemove(function(e) {

if(dragging) {
cleft=coord.oleft + (e.pageX || e.screenX) - coord.ox;
ctop=coord.otop + (e.pageY || e.screenY) - coord.oy;
var value_=tixrangeslider_sliderValue(cleft);
if(value_<min || value_>max) return false;

if(options.step>0){
if(value_% options.step==0){
rangeSlider.find(".knob,.indicator").css("left",cleft + "px");

}
}else{
rangeSlider.find(".knob,.indicator").css("left",cleft + "px");

}


rangeSlider.find(".indicator").html(tixrangeslider_ap(value_)); 
rangeSlider.find(".highlighted").animate({width:cleft},20);
}
});


   };
   
      $.fn.tixrangeslider = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixrangeslider')) return;

           // pass options to plugin constructor
           var tixrangeslider = new TixRangeSlider(this, options);

           // Store plugin object in this element's data
           element.data('tixrangeslider', tixrangeslider);
       });
	  
   };
})(jQuery);		

