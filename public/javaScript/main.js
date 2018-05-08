//create a new list item when we click on add button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.innerHTML="<input type='checkbox' class='checkBox'> <button onclick='closeFunction(this)' id='closeButn' class='close'>x</button>";
  li.appendChild (t); 
  //for displaying the li list we enter
  if(inputValue === '') {
    //alert if we had not enter anything
    alert("You have to add text here");
  }
  else {
    document.getElementById("myUL").appendChild(li);
  }
  //for getting empty text for inout
  document.getElementById("myInput").value="";
}
// Click on a close button to hide the current list item
function closeFunction(e) {
  var elem = document.getElementById('myUL');
  e.parentNode.parentElement.removeChild(e.parentNode)
}


//********************** 
// select all and changes background color on click of mark all button
// $(document).ready(function(){
//   $(".markAll").click(function(){
//     $("li").addClass("liAllMark");
//   });
//  });


//for checking all check box onclick of mark all button
$(document).ready(function(){
    $(".markAll").click(function(){
      $(".checkBox").attr("checked", true);
    })

    $(".unmarkAll").click(function(){
      $(".checkBox").attr("checked",false)
    })
});
