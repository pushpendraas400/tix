(function($){
   var Tixgroup   = function(element, options)
   {
   var elem = $(element);
   
	var defaults = {
				interval:200,
				easing:'swing',
				adjustCanvasHeight:true
				
				
               	            };
							
	 options = $.extend(defaults, options);						
	
	//important: you must provie li width and height to make this plugin work
	
	var ul=elem.find("ul.tixgroupitems");
	var li=ul.find(" > li");
	var liFirst=ul.find(" > li:first ");
	
	var itemWidth=liFirst.outerWidth(true);
	var itemHeight=liFirst.outerHeight(true);
	
	
	
	//li.css({width:itemWidth + "px",height:itemHeight + "px"});
	
	
	var num=li.length;
	var groups=new Array();
	
	var elemWidth=elem.outerWidth();
	var ulWidth=ul.outerWidth();
	
	
	
	
	var cols=Math.floor(elemWidth/itemWidth); //find columns in the group
	var rows=Math.ceil((num/cols)+1); //find rows in the group
		

 
var shuffleArray=function(o)
{
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};  //end  shuffleArray
 
 
 /* create an array of  all the groups available*/
 var tixgroup_groups=function(){
li.each(function(i){
var group=$(this).attr("data-group");
if(groups.indexOf(group)==-1){groups.push(group);};
});
 
 }
 
 /*get all the groups available */
 var tixgroup_getGroups=function(){
 return groups;
 }

/*create group links html */ 
var tixgroup_appendGroups=function(){
var filters=tixgroup_getGroups();
elem.find(".filters").append("<ul class='list plain'></ul>");
var f=elem.find(".filters ul"); //.filters is wrapper for our buttons
f.append("<li class='left'><a href='#' class='filter uppercase current' data-group='all'>All</a></li>");
 for(var i=0;i<filters.length;i++){
 f.append("<li class='left' ><a href='#' class='filter uppercase' data-group='"+filters[i]+"'>"+filters[i]+"</a></li>"); 
 }

} 

/*randomize all li's
calculate each li's left and top and save them with data attributes
data-xx and data-yy
later during animation we will use these attributes values for our references
if random==true randomize position else each li will take position as it appears in the
UL
*/

var tixgroup_createSequence=function(random){
if(typeof randome==undefined){random=false;}
var arr=new Array();
var randomArr=new Array();

if(random===true){

for(var i=0;i<num;i++){
arr.push(i);
}
randomArr=shuffleArray(arr);
}


var row=-1;
var filterHeight=elem.find(".filters").outerHeight();
 li.each(function(i){
 var n=i;
 if(random===true){n=randomArr[i];}
 
  if(n%cols==0){row++;}
  if(n<cols){
 xx=n*itemWidth;
yy=filterHeight;

 }else{
 xx=((n%cols)*itemWidth);
 //yy=filterHeight+row*itemHeight;
 yy=itemHeight+row*itemHeight*2; // itemHeight*2 to avoid li overlap our group buttons
 }
 $(this).attr("data-seq",n+1);
 $(this).attr("data-xx",xx);
 $(this).attr("data-yy",yy);
 });
}
 
 
 /* animate li's of a specific group */
  var tixgroup_filter=function(groupName){
 
 var group;
 var n=0;var xx=0;var yy=0;var filterHeight=elem.find(".filters").outerHeight();var row=-1;
 var nogroup=ul.find(" > li:not([data-group='"+groupName+"'])");
var visible=ul.find(" > li:visible").length;

 if(groupName=="all"){
 group=li;
 n=num;
 tixgroup_createSequence(true); //randomize all li's for 'all' groups
 }else{
 group=ul.find(" > li[data-group='"+groupName+"']");
 n=group.length;
 }
 
//console.log("visible:"+);
 
 group.each(function(i){
 var item=$(this);
 var t=0;
 if(i%cols==0){row++;}
  if(i<cols){
 xx=i*itemWidth;
yy=filterHeight;

 }else{
 xx=((i%cols)*itemWidth);
 yy=filterHeight+row*itemHeight;
 }
 
 t=i+1;
 /*
item.show().animate({left:xx + "px",top:yy + "px",opacity:1},options.interval*t + options.interval*rows,options.easing,function(){
  
   if(options.adjustCanvasHeight===true && t>=n){
 rows=Math.ceil((n/cols));
 elem.animate({height:rows*itemHeight + "px"},100);
 
 }
});
*/
 
 item.show().animate({
 left:xx + "px",top:yy + "px",opacity:1
  },
  
  {
  duration:options.interval*t + options.interval*rows,
  easing:options.easing,
 complete:function(){
 rows=Math.ceil((n/cols));
   if(options.adjustCanvasHeight===true){
   if((t==1 && n>visible) || (n<=visible && t>=n) ){
 
 elem.animate({height:((rows)*itemHeight + itemHeight/2) + "px"},100);
 }else{
 }
 
 }
 },
 /*
 complete:function(){
    if(options.adjustCanvasHeight===true){
   if(t==1 && n>visible){
 rows=Math.ceil((n/cols));
 elem.animate({height:rows*itemHeight + "px"},100);
 }
 }
 }*/

 
  }
 
 );
 

 if(groupName!='all'){
 nogroup.each(function(){
 $(this).stop().animate({opacity:0,left:$(this).attr("data-xx") + "px",top:$(this).attr("data-yy")+"px"},options.interval*n,options.easing,function(){
 $(this).hide();

 });
 
  });
  }

 
 });
 


 }
 
 var tixgroup_init=function(){
 elem.css({position:'relative',width:'100%',height:(rows)*itemHeight + "px"});
li.attr({"data-width":itemWidth,"data-height":itemHeight});
li.css({display:'inline-block'});

 //li.css({});
 tixgroup_groups();
 tixgroup_appendGroups();
 tixgroup_filter('all');

 
   $("a.filter").click(function(e){
 e.preventDefault();
 
 var dtagroup=$(this).attr("data-group");
 elem.find(".filters a").removeClass('current');
 elem.find("a[data-group='"+dtagroup+"']").addClass('current');
 tixgroup_filter(dtagroup);
 })
 
 

 //initial animation
 /*
 var xx=0;
 var yy=0;
 var row=-1;
 for(var i=0;i<num;i++){
 var item=ul.find("li:nth-child("+(i+1)+")");
 if(i%cols==0){row++;}
 
 if(i<cols){
 xx=i*itemWidth;
 yy=0;
 }else{
 xx=((i%cols)*itemWidth);
 yy=row*itemHeight;
 }
 
 item.stop().animate({left:xx + "px",top:yy + "px",opacity:1},options.interval*i);
 
 }
 */
 
 }
 


 
 
 tixgroup_init();
 
 };

     $.fn.tixgroup = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixgroup')) return;

           // pass options to plugin constructor
           var tixgroup = new Tixgroup(this, options);

           // Store plugin object in this element's data
           element.data('tixgroup', tixgroup);
       });
	  
   };
})(jQuery);	

