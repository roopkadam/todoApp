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
        li.innerHTML="<input type='checkbox' class='checkBox'><span data-id="+data.id+"class='inputWrappText'>"+data.todoapp+"</span> <button  id='closeButn' class='close'>x</button>";
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
         $(".checkBox").attr("checked","checked");
        }
    });
  });



  //for un-checking all check box onclick of unmark all button 
  $(".unmarkAll").click(function(){
    $("li").removeClass("liAllMark")
    $(".checkBox").removeAttr("checked");
    return false;
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
        }
        else {
          $(nameThis).parent().removeClass("liAllMark")
        }
      }
    });
  });
});


