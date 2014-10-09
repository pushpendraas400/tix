(function($){
   var TixcharCount = function(element, options)
   {
   var elem = $(element);
   
  
	var defaults = {
				max:40,
				append:' Character(s) left'
                
            };
     
// Extend our default options with those provided.
 options = $.extend(defaults, options);
 elem.next(".tixcharcount").remove();
 elem.after("<span class='tixcharcount'>"+options.max + options.append+"</span>");
     
    elem.keyup(function() {  // call function on keyup
        tixcharcount_checkChars(elem,elem.next(".tixcharcount"));
    }).mouseout(function() { // on mouseout
       tixcharcount_checkChars(elem,elem.next(".tixcharcount"));
    });


function tixcharcount_checkChars(elem,charsCountEl)
{   
    charsCountEl.text(options.max);
    var thisChars = elem.val().replace(/{.*}/g, '').length;
    if(thisChars > options.max) 
    {
        var CharsToDel = (thisChars-options.max); 
        elem.val(elem.val().substring(0,elem.val().length-CharsToDel)); 
        charsCountEl.text( (options.max - elem.val().length) + options.append );
    }else{
        charsCountEl.text( (options.max - thisChars) + options.append ); 
    }
}
  
 
 };

      $.fn.tixcharcount = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixcharcount')) return;

           // pass options to plugin constructor
           var tixcharcount = new TixcharCount(this, options);

           // Store plugin object in this element's data
           element.data('tixcharcount', tixcharcount);
       });
	  
   };
})(jQuery);	

