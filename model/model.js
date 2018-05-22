const fs = require('fs');
var path = require("path");
// get todo function callback
function getTodo (callBack){
	fs.readFile(path.join(__dirname, '../todo.json'), 'utf8', function (err, data) {
		var parseData = JSON.parse(data)
		if (err)  callBack(err);
		console.log(data);
		callBack(null,parseData);
	});
}
// call back function for adding data
function addTodo(task,callBack) {
	var generateId=  Math.floor(Math.random() * 26) + Date.now();
	var objectArray = require('../todo.json');
	var tempArry = {
		todoapp: task,
		id: generateId
	}
	objectArray.push(tempArry);
	fs.writeFile(path.join(__dirname,'../todo.json'), JSON.stringify(objectArray), 'utf-8', function(err,data) {	
		if (err) callBack(err);
		console.log("from model----------------------------------",objectArray);
		callBack(null,tempArry);
	});
	// callBack(tempArry);
}

function deleteTodo(taskDelete,callback){
	// var obj = todoArrayAfterDelete;
	  fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		if (err) callback(err);
		var todoArray = JSON.parse(data);
    function remove(array, element) {
     return array.filter(todoArray => todoArray.id !== element);
   }
     var todoAfterDelete = remove(todoArray, taskDelete.id)
		 console.log("from delete--------",todoAfterDelete)
   // console.log("==========",todoArray)

		// obj = todoArrayAfterDelete;
		// fs.writeFile(path.join(__dirname,'../todo.json'),JSON.parse(todoArray),'utf-8', function(err,data){
		// 	if (err) callBack(err)
		// 	console.log('task deleted',todoArray);
		// 	callback(null,todoArray);
		// });
	});
}

module.exports ={getTodo,addTodo,deleteTodo};

