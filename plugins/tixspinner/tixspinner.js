(function($){
$.fn.tixspinner=function(options){
var defaults = {
		min:0,
		max:100000000,
		step:0.01
				};
				
// Extend our default options with those provided.
 options = $.extend(defaults, options);
var input_min=options.min;
var input_max=options.max;
var input_step=options.step;
var attributes={};

var elem=$(this);
//get all the attributes of the element
 if(elem && elem.length) $.each(elem.get(0).attributes, function(v,n) { 
            n = n.nodeName||n.name;
            v = elem.attr(n); // relay on $.fn.attr, it makes some filtering and checks
            if(v != undefined && v !== false) attributes[n] = v
        })



function tixspinner_addSpinners(){
var t;
$.each(attributes,function(i,v){
t=t + " " + i+'='+v;
});

//append spinnter html and create a dummy input like elem and remove orignal element (elem)
//we are removing orignal elem and creating a new copy of it with some html
elem.after("<div class='tixspinner'><div class='spinner-input'><input type='text'"+t+" /></div><div class='spinners'><ul class='plain'><li><a href='#' class='tixspinner_up'><i class='fa fa-angle-up'></i></a></li><li><a href='#' class='tixspinner_down'><i class='fa fa-angle-down'></i></a></li></ul></div></div>");
elem.remove();
}
 

function tixspinner_createRange(obj){
var input=obj.find("input");
var attr_min=parseFloat(input.attr("data-min"));
var attr_max=parseFloat(input.attr("data-max"));
var attr_step=parseFloat(input.attr("data-step"));
if( attr_min && !isNaN(attr_min)){
input_min=attr_min;
}
if( attr_max && !isNaN(attr_max)){
input_max=attr_max;
}
if( attr_step && !isNaN(attr_step)){
input_step=attr_step;
}

var r=new Object();
r.min=input_min;
r.max=input_max;
r.step=input_step;

return r;
}

function tixspinner_handleInput(obj){
var input_range=new Object();
input_range=tixspinner_createRange(obj);
var input=obj.find("input");

   input.keydown(function (e) {
   
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
		
		
		
    });

	input.keyup(function(e){
	var inputval=input.val();
	if(inputval<=input_range.min){input.val(input_range.min);return;}
		if(inputval>=input_range.max){input.val("").val(input_range.max);return;}
	
	});
	

}


function tixspinner_handlespins(spinner_wrapper){
var input_range=new Object();
input_range=tixspinner_createRange(spinner_wrapper.find(".spinner-input"));
var input=spinner_wrapper.find("input");
if(input.val()==undefined || input.val()==""){
input.val(input_range.min);
}



spinner_wrapper.find(".tixspinner_up").click(function(e){
e.preventDefault();
var inputval=parseFloat(input.val());
if(inputval>=input_range.max){return;}
inputval+=parseFloat(input_range.step);
input.val(inputval.toFixed(2));
});

spinner_wrapper.find(".tixspinner_down").click(function(e){
e.preventDefault();
var inputval=parseFloat(input.val());
if(inputval<=input_range.min){return;}
inputval-=parseFloat(input_range.step);
input.val(inputval.toFixed(2));
});

}


tixspinner_addSpinners();
$(".tixspinner").each(function(){
var spinner=$(this);
var input=spinner.find('input');
if(input.length>0){
tixspinner_addSpinners(spinner.find(".spinner-input"));
}
tixspinner_handleInput(spinner.find(".spinner-input"));
tixspinner_handlespins(spinner);

});


};
})(jQuery);	

