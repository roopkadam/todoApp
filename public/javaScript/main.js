//create a new list item when we click on add button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;

  //ajax call
  var data = { data: inputValue }
  console.log(inputValue); 
  console.log("data   ",data)          

  //for displaying the li list we enter 
  if(inputValue.trim() === "") {
    alert("You have to add text here");
  }
  else {
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:3000/taskadd',            
      success: function(data) {
      console.log(JSON.stringify(data));
        console.log(li)
        li.innerHTML="<input type='checkbox' class='checkBox'><input type='text' data-id="+data.id+"class='inputWrappText' value="+data.todoapp+"> <button  id='closeButn' class='close'>x</button>";
        document.getElementById("myUL").appendChild(li);
      }
    });
  }  
  document.getElementById("myInput").value="";
}   



$(document).ready(function(){
  $("ul").on('click','#closeButn',function() {
    //ajax call to delete element
    var thisName = this;
    var removingText =$(this).parent().find('.inputWrappText').attr("data-id");
    console.log(removingText)
    $.ajax({
      url: '/taskdelete/'+removingText,
      type: 'delete',
      contentType: 'application/json',
      success: function(result) {
       $(thisName).parent().remove('li');
      }
    });
  });


  //for checking all check box onclick of mark all button
  $(".markAll").click(function(){
      $.ajax({
        url: '/markAllClick',
        type: 'PUT',
        contentType: 'application/json',
        success:function(){
         $("li").addClass("liAllMark")
         $('input[type=checkbox]').prop('checked', true);
        }
    });
  });



  //for un-checking all check box onclick of unmark all button 
  $(".unmarkAll").click(function(){

     $.ajax({
        url:'/unmarkAllClick',
        type:'PUT',
        contentType: 'application/json',
        success:function(){
          $("li").removeClass("liAllMark")
         $('input[type=checkbox]').prop('checked', false);
          return false;
        }
      });
  });



  //background color when checked
  $('.checkBox').on('change', function() {
    var nameThis = this;
    console.log("im in change")
    var removingText =$(this).parent().find('.inputWrappText').attr("data-id");
    //ajax call for changing status on on checkbox
    $.ajax({
      url: '/updateStatus/'+removingText,
      type: 'PUT',
      contentType: 'application/json',
      success:function(){
        if ($(nameThis).is(":checked")) {
          $(nameThis).parent().addClass("liAllMark")
         $(nameThis).prop('checked', true);
        }
        else {
          $(nameThis).parent().removeClass("liAllMark");
         $(nameThis).prop('checked', false);
        }
      }
    });
  });

 //ajax call for all button click
  $(".allTask").click(function(){
    $('.activeDiv').removeClass('disp');
    $('.completedDiv').removeClass('disp');
  });

  $(".active").click(function() {  
    console.log("active button is clicked");
    var thisName = this;
    $.ajax({
      url:'/activeButnClick',
      type:'PUT',
      contentType: 'application/json',
      success:function(active){
        $('.activeDiv').removeClass('disp');
        $('.completedDiv').addClass('disp');

        console.log(JSON.stringify(active));
        console.log("active",active)
        for (var i=0;i<active[i].length ;i++){
          var li=$("<li></li>")
          if($ (li.className) =="liAllMark"){
            console.log(k);
            $(li.setAttribute("style", "display: none;"));
          }
          // $(".active").append("<li><input type='checkbox' class='checkBox'><input type='text' data-id="+active.id+"class='inputWrappText' value="+active.todoapp+"> <button id='closeButn' class='close'>x</button></li>")
        }
      console.log("coming here",active)
      }
    });
  });
//ajax call for complete button click
  $(".completed").click(function() {
    $('.completedDiv').removeClass('disp');
    $('.activeDiv').addClass('disp');
  });
});


        // var li = document.createElement("li");
        // var node = document.getElementById("myUL");
        // var lis = document.getElementById("myUL").getElementsByTagName("li");
        // for (var k in lis) {
        //   if (lis[k].className == "liAllMark") {
        //     console.log(lis[k])
        //     lis[k].setAttribute("style", "display: none;");
        //   }
        // }