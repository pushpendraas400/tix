(function($){
   var TixdatePicker = function(element, options)
   {
   var elem = $(element);
   var val_=elem.val();
  var datepicker;
  var elem_name=elem.attr("name");
   var currentday,currentmonth,currentyear;
  var today=new Date();
var months={
1:'January',
2:'February',
3:'March',
4:'April',
5:'May',
6:'June',
7:'July',
8:'August',
9:'September',
10:'October',
11:"November",
12:'December'
}
	var defaults = {
				yeargap:15,
				yearMonthSelection:true, //show months and years dropdown
				topOffset:2,
				hiddenCallback:function(){},
				shownCallback:function(){}
				
				
            };
     
// Extend our default options with those provided.
 options = $.extend(defaults, options);

  var tixdatepicker_setMonthYear=function(cmonth,cyear){
 currentmonth=cmonth;
 currentyear=cyear;
 }
 
 var tixdatepicker_getMonthYear=function(){
  var obj={month:currentmonth,year:currentyear};
 return  obj;
 }
 
 var tixdatepicker_translateMonth=function(m){
 return months[m];
 }
 
 
 var tixdatepicker_init=function(){
 $("body").find("#tixdatepicker_"+elem_name).remove();
  
  $('body').append("<div id='tixdatepicker_"+elem_name+"' class='tixdatepicker'><table class='op'><Tr><td><a href='#' class='cal-prev'><i class='fa fa-angle-left'></i></a></td><td class='cmonth'></td><td class='cyear'></td><td class=''><a href='#' class='cal-next'><i class='fa fa-angle-right'></i></a></td></tr></table><table class='main table-bordered'><thead><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody></tbody><Tfoot><tr><Td colspan='7' class='td_today'><a class='button-alt button-alt-primary' href='#'>Today</a></td></tr></tfoot></table><table class='selection' ><thead><tr><th>Month</th><th>Year</th></tr></thead><tbody><tr><td class='months'><select id='selmonth' size='12'></select></td><td class='years'><select size='12' id='selyear'></select></td></tr></tbody><tfoot><tr><td><ul class='list plain'><li class='left'><a class='selcancel button-alt button-alt-danger' href='#'><i class='fa fa-times'></i></a></li><li class='left'><a href='#' class='selok button-alt button-alt-primary'><i class='fa fa-check'></i></a></li></ul></td></tr></tfoot></table></div>");
  
  
  //append months and years name
  datepicker=$("#tixdatepicker_"+elem_name);
  var selection=datepicker.find(".selection");
  $.each(months,function(key,val){
  selection.find("#selmonth").append("<option value='"+key+"'>"+val+"</option>");
 });
 //append years
 var currentYear=today.getFullYear();
 var yearLimit1=currentYear-options.yeargap;
 var yearLimit2=currentYear+options.yeargap;
 
 for(var i=yearLimit1;i<=yearLimit2;i++){
 selection.find("#selyear").append("<option value='"+i+"'>"+i+"</option>");
 }
 
 //make input readonly
 elem.attr("readonly","readonly").addClass("readonlypicker");
 
 if(options.yearMonthSelection==false){
 calender.find("td.months").remove();
  calender.find("td.years").remove();
 }
 
 if(elem.val().length>1){
 var arr=new Array();
 arr=elem.val().split("/");
 tixdatepicker_setMonthYear(parseInt(arr[0]),parseInt(arr[1]));
 }

 }
 
 tixdatepicker_init();
 var tixdatepicker_close=function(){
   datepicker.fadeOut("fast");
  datepicker.find('table.selection').hide();
  datepicker.find("table.op,table.main").show();
  tixdatepicker_trigger('hidden');

 }

 var tixdatepicker_createCalender=function(day,mm,yy,selectday){

 if(mm>12 ){ yy++;mm=1;}
 if(mm<=0){yy--;mm=12;}

 var fdate=mm +'/'+day+'/' + yy;
 console.log("fdate:"+fdate);
var mydate=new Date(fdate);
var op=datepicker.find("table.op");
op.find("td.cmonth").text(tixdatepicker_translateMonth(mm));
op.find("td.cyear").text(yy);

var date = new Date(mydate.getFullYear(),mydate.getMonth(),1,0,0,0,0); // Starting at the 1st of the month
  var extras = (date.getDay() + 6) % 7; // How many days of the last month do we need to include?
	date.setDate(date.getDate()-extras); // Skip back to the previous monday
 var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
 var classname='';
 
 var tbl=datepicker.find("table.main");
 //prepare the table
 tbl.find("tbody>tr").remove();
 var tr="<Tr>";
   while (1) { // Loop for each week

	
   for (i=0;i<7;i++) { // Loop each day of this week

   classname='';
    var html="";
      if (date.getMonth() != mydate.getMonth()) {
        classname+='othermonth';
      }else if(date.getDate()==today.getDate() && date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()) {
    		classname+='today';
	      }else if(date.getDate()==day && selectday==true){
		  classname+='today';
		  }else{
			classname="monthday";
				}		  
	  
       
	  
	  
	   tr+=("<Td class='"+classname+"'>"+date.getDate()+"</td>");
	  	    
	  
       // Increment a day
	   date.setDate(date.getDate()+1);
    }
tr+="</tr>";
tbl.find("tbody").append(tr);
tr="<Tr>";
 // We are done if we've moved on to the next month
	  	if (date.getMonth() != mydate.getMonth()) {
		tixdatepicker_setMonthYear(mm,yy);
      break;
    }
	
	
  }
 
   datepicker.find("td.monthday,td.today").on('click',function(e){
	   var obj=tixdatepicker_getMonthYear();
  var m=obj.month,y=obj.year,d=$(this).text();
  elem.val(m + "/" + d + "/" + y);
   tixdatepicker_close();
   
  });
 
 
 }
 

 
 var tixdatepicker_showCalender=function(day,month,year,selectday){
  var pos=elem.offset();
 var height=elem.outerHeight();
  var d=0,m=0,y=0;
d=Number(day);
 m=Number(month);
 y=Number(year);
 
 datepicker.css({top:(height+pos.top + options.topOffset)+"px",left:pos.left + "px"});
  tixdatepicker_createCalender(d,m,y,selectday);
 datepicker.fadeIn("fast",function(){
 tixdatepicker_trigger('shown');
 });
 
 }
 
 var tixdatepicker_open=function(){
   if(elem.val()=="")
 {
 currentday=today.getDate();
 currentmonth=today.getMonth() + 1;
 currentyear=today.getFullYear();
 }else{
 //fetch details from textbox
 var obj=elem.val().split("/");
 currentday=Number(obj[1]);
 currentmonth=Number(obj[0]);
 currentyear=Number(obj[2]);
 }
tixdatepicker_showCalender(currentday,currentmonth,currentyear,true);
  datepicker.find("#selmonth").val(currentmonth);
  datepicker.find("#selyear").val(currentyear);
 }
 
  //if user has used tix's form append or prepend input icon,make sure their click event opens picker 
 elem.closest(".input-wrapper").find("i,span,a").on('click',function(e){
 e.preventDefault();
 e.stopPropagation();
 tixdatepicker_open();
 });
 
 
 
 elem.click(function(e){
e.stopPropagation();
tixdatepicker_open();
 
 });
 
 
 
 //month caption click activate months dropdown list and hide this caption
 datepicker.find("td.cmonth,td.cyear").on('click',function(e){
 e.preventDefault();
 e.stopPropagation();
 if(options.yearMonthSelection==true){
  datepicker.find("td.months").show();
  datepicker.find('table.selection').show();
  datepicker.find("table.op,table.main").hide();
  }
 
 });

 
 datepicker.find(".selcancel,.selok").click(function(e){
 e.stopPropagation();
 e.preventDefault();
 datepicker.find("table.selection").hide();
 datepicker.find("table.main,table.op").show();
 if($(this).hasClass("selok")){
 var mm=$("#selmonth").val();
 var yy=$("#selyear").val();
 var dd=today.getDate();
 var id=$(this).attr("id");
  tixdatepicker_setMonthYear(mm,yy);
 tixdatepicker_createCalender(dd,mm,yy,false);
 

 }
 
 });
 //months and years dropdown selection
 /*
   datepicker.find("#selmonth,#selyear").on('change',function(e){
   e.stopPropagation();
  
 
 });*/
 
 //stop event propagation for dropdowns
 datepicker.find("#selmonth,#selyear").on('click',function(e){
  e.stopPropagation();
 });

 
//next and previous button click
 
 datepicker.find(".cal-next").on('click',function(e){
 e.stopPropagation();
 e.preventDefault();
 var obj=tixdatepicker_getMonthYear();
 console.log(obj);
 var m=obj.month;
 m++;
 
 var y=obj.year;
  tixdatepicker_createCalender(1, m,y,false);
 datepicker.find("#selmonth").val(obj.month+1);
  datepicker.find("#selyear").val(obj.year);

 });
 
  datepicker.find(".cal-prev").on('click',function(e){
  e.stopPropagation();
 e.preventDefault();

var obj=tixdatepicker_getMonthYear();
 var m=parseInt(obj.month);
 m--;
 var y=obj.year;
  tixdatepicker_createCalender(1,m ,parseInt(obj.year),false);
   datepicker.find("#selmonth").val(obj.month-1);
  datepicker.find("#selyear").val(obj.year);
 
 });
 
 datepicker.find("td.td_today a").click(function(e){
 e.preventDefault();
 elem.val((today.getMonth() +1) + "/" + today.getDate()+"/" + today.getFullYear());
 });
 

 $(document).on('click',function(){
tixdatepicker_close();
  });
 
 
 //trigger events
 var tixdatepicker_trigger=function(trigger){
 if(trigger=="hidden"){
 if(options.hiddenCallback && typeof options.hiddenCallback == 'function'){
 options.hiddenCallback(undefined != arguments[0] ? arguments[0] : '');
 }
 }
 if(trigger=="shown"){
 if(options.shownCallback && typeof options.shownCallback == 'function'){
 options.shownCallback(undefined != arguments[0] ? arguments[0] : '');
 }
 }

 
 }
 
 
 };

      $.fn.tixdatepicker = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('tixdatepicker')) return;

           // pass options to plugin constructor
           var tixdatepicker = new TixdatePicker(this, options);

           // Store plugin object in this element's data
           element.data('tixdatepicker', tixdatepicker);
       });
	  
   };
})(jQuery);	

