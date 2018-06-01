//create a new list item when we click on add button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;

/**
* @function addTodo
* @description:this function is to add elements
*/
  var data = { data: inputValue.trim() }
  console.log(inputValue);
  console.log("data   ", data)
  //for displaying the li list we enter 
  if (inputValue.trim() === "") {
   alert("You have to add text here");
  }
  else {
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:3000/taskadd',
      success: function (data) {
      console.log(JSON.stringify(data));
      console.log(li)
      li.innerHTML = "<input type='checkbox' class='checkBox'><input type='text' data-id=" + data.id + "class='inputWrappText' value=" + JSON.stringify(data.todoapp) + "> <button  id='closeButn' class='close'>x</button>";
       document.getElementById("myUL").appendChild(li);
      }
    });
  }
  document.getElementById("myInput").value = "";
}

/**
* @function deleteTodo
* @description:this function is to delete elements from json
*/
$(document).ready(function (){
  $("ul").on('click', '#closeButn', function (){
    var thisName = this;
    var removingText = $(this).parent().find('.inputWrappText').attr("data-id");
    console.log(removingText)
    $.ajax({
      url: '/taskdelete/' + removingText,
      type: 'delete',
      contentType: 'application/json',
      success: function (result) {
        $(thisName).parent().remove('li');
      }
    });
  });

  /**
  * @function markAll
  * @description:this function is to check all the elements
  */
  //for checking all check box onclick of mark all button
  $(".markAll").click(function () {
    $.ajax({
      url: '/markAllClick',
      type: 'PUT',
      contentType: 'application/json',
      success: function () {
        $("li").addClass("liAllMark")
        $('input[type=checkbox]').prop('checked', true);
        $(".inputWrappText").prop("readonly",true);
      }
    });
  });


  /**
  * @function unmarkAll
  * @description:this function is to uncheck all the elements
  */
  //for un-checking all check box onclick of unmark all button 
  $(".unmarkAll").click(function () {
    $.ajax({
      url: '/unmarkAllClick',
      type: 'PUT',
      contentType: 'application/json',
      success: function () {
        $("li").removeClass("liAllMark")
        $('input[type=checkbox]').prop('checked', false);
        $(".inputWrappText").prop("readonly",false);
        return false;
      }
    });
  });


  /**
  * @function check
  * @description:this function is used for changing status on on checkbox
  */
  //background color when checked
  //ajax call for changing status on on checkbox
  $('.checkBox').on('change', function (){
    var nameThis = this;
    console.log("im in change")
    var removingText = $(this).parent().find('.inputWrappText').attr("data-id");
    $.ajax({
      url: '/updateStatus/' + removingText,
      type: 'PUT',
      contentType: 'application/json',
      success: function () {
        if ($(nameThis).is(":checked")) {
          $(nameThis).parent().addClass("liAllMark")
          $(nameThis).prop('checked', true);
          $(".inputWrappText").prop("readonly",true);
        }
        else {
          $(nameThis).parent().removeClass("liAllMark");
          $(nameThis).prop('checked', false);
          $(".inputWrappText").prop("readonly",false);
        }
      }
    });
  });

  /**
  * @function allTask
  * @description:this function is used for showing all the elements
  */  
  //ajax call for all button click
  $(".allTask").click(function(){
    $('.inputDiv').removeClass('disp');
    $('.activeDiv').addClass('disp');
    $('.completedDiv').addClass('disp');
  });


  /**
  * @function active
  * @description:this function is used for showing the active task
  */
  //ajax call for click on active button
  $(".active").click(function() {  
    $(".activeDiv").html("");
    console.log("active button is clicked");
    var thisName = this;
    $.ajax({
      url: '/activeButnClick',
      type: 'PUT',
      contentType: 'application/json',
      success:function(active){
        console.log(JSON.stringify(active));
        console.log("active",active)
        for (var i=0;i<active.length ;i++){
          $(".activeDiv").append("<li><input type='checkbox' class='checkBox'><input type='text' data-id="+active[i].id+"class='inputWrappText' value="+active[i].todoapp+"> <button id='closeButn' class='close'>x</button></li>")
        }
          $('.activeDiv').removeClass('disp');
          $('.inputDiv').addClass('disp');
          $('.completedDiv').addClass('disp');
      }
    });
  });

  /**
  * @function completed
  * @description:this function is used for showing the completed task
  */
  //ajax call for complete button click
  $(".completed").click(function() {
    $(".completedDiv").html("");
    console.log("completed button is clicked");
    var thisName = this;
    $.ajax({
      url: '/completedButnClick',
      type: 'PUT',
      contentType: 'application/json',
      success:function(active){
        console.log(JSON.stringify(active));
        console.log("active",active)
        for (var i=0;i<active.length ;i++){
          $(".completedDiv").append("<li><input type='checkbox' class='checkBox'><input type='text' data-id="+active[i].id+"class='inputWrappText' value="+active[i].todoapp+" readonly> <button id='closeButn' class='close'>x</button></li>")
        } 
          $('.completedDiv').removeClass('disp');
          $('.inputDiv').addClass('disp');
          $('.activeDiv').addClass('disp');
      }
    });
  });

  /**
  * @function clearCompleted
  * @description:this function is used for removing all the completed task
  */
  $(".clearCompleted").click(function(){
    console.log("clear completed button click")
    var thisName = this;
    $.ajax({
      url: '/clearCompleteButnClick',
      type: 'delete',
      contentType: 'application/json',
      success: function () {
        console.log("clear completed Success")
        $(".liAllMark").remove()
       }
      });
    });
  

  //updating text on keypress of enter
    $(".inputWrappText").keydown(function(e){
      var key = e.which;
      var values = $(this).parent().find('.inputWrappText').val();
      var removingText = $(this).parent().find('.inputWrappText').attr("data-id");
      if(key == 13) {
        $.ajax({
        url: '/updateTextInput/' + removingText,
        type: 'PUT',
        data: JSON.stringify({data:values}),
        contentType: 'application/json',
        success: function () {
          console.log("sucess of updating text")
        }
      });
      }
      
  });
});