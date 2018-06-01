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

/**
* @function addTodo (task,callBack)
* @description: function is for adding data in json file
*/

function addTodo(task) {
	return new Promise(function(resolve,reject){
	console.log("in add todo model")
	var generateId=  Math.floor(Math.random() * 26) + Date.now();
	var objectArray = require('../todo.json');
	var tempArry = {
		todoapp: task,
		id: generateId,
		status:false
	}
	objectArray.push(tempArry);
	fs.writeFile(path.join(__dirname,'../todo.json'), JSON.stringify(objectArray), 'utf-8', function(err,data) {	
		if (err) throw(err);
		console.log(objectArray);
		resolve(tempArry);
		});
	});
}

/**
* @function deleteTodo(taskDelete,callback)
* @description: function is for deleting data from json file
*/
function deleteTodo(taskDelete){
	return new Promise(function(resolve,reject){
	function remove(array, element) {
		// console.log(element);
		var x = array.filter(e => e.id != element);
		return x;
	}
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		console.log(todoArray)
		if (err) throw(err);
		var todoDeletedArray = remove(todoArray,taskDelete)
		fs.writeFile('./todo.json', JSON.stringify(todoDeletedArray), 'utf-8', function(err,data) {
			if (err) throw err
			console.log("done",todoDeletedArray);
		})
		resolve(todoDeletedArray);
	});
});
}

/**
* @function updateStatusTodo(updateSts,callback)
* @description: function is for updating status on click of check button in json file 
*/
function updateStatusTodo(updateSts){
	return new Promise(function(resolve,reject){
	console.log("in model", updateSts);
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err) throw(err);
		function statusChange(updateSts){
			// in updateSts id of the element is coming
			todoArray.forEach(function(element) {
				if(element.id == updateSts)
				element.status = !element.status;
			});
			console.log(todoArray);
		}
		statusChange(updateSts)
		fs.writeFile('./todo.json', JSON.stringify(todoArray), 'utf-8', function(err,data) {
			if (err) throw err
		});
			resolve(todoArray)
	});//readfile
	});
}

/**
* @function markAllTodo(callback)
* @description: function is to check all the elements
*/
function markAllTodo() {
	return new Promise(function(resolve,request){
		fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err)throw(err);
			todoArray.forEach(function(element) {
				element.status = true;
		});
			fs.writeFile('./todo.json', JSON.stringify(todoArray), 'utf-8', function(err,data) {
			if(err)throw err
			console.log("done",todoArray);
		});
     resolve(todoArray)
		});
	});
}

/**
* @function unmarkAllTodo(callback)
* @description: function is to uncheck all the elements
*/
function unmarkAllTodo(){
	console.log("in unmark all model" )
	return new Promise(function(resolve,request){
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		console.log("tititittiitttiitti",todoArray)
		if (err) throw(err);
		todoArray.forEach(function(element){
			element.status = false;
		});	
		fs.writeFile('./todo.json', JSON.stringify(todoArray), 'utf-8', function(err,data) {
			if (err) throw err
			console.log("unmark All done",todoArray);
				resolve(todoArray)
		});
	 	});
	});
}

/**
* @function activeTodo(callback)
* @description: function is to show all active tasks
*/
function activeTodo(){
	console.log("in active model");
	return new Promise(function(resolve,request){
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		console.log(todoArray)
		if (err) throw(err);
		var activeArray = todoArray.filter(function(element){
			console.log(element)
			if(element.status != true){
			return element;
			}
		});	
		 resolve(activeArray)
	 });
	});
}

/**
* @function completeTodo(callback)
* @description: function is to show all completed tasks
*/
function completeTodo(){
	console.log("in complete model");
	return new Promise(function(resolve,request){
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		console.log(todoArray)
		if (err) throw(err);
		var completeArray = todoArray.filter(function(element){
			if(element.status !=false){
				return element;
			}
		});
		resolve(completeArray);
   });
	});
 }

/**
* @function clearCompTodo(callback)
* @description: function is to rempve all completed tasks from json file
*/
function clearCompTodo(){
	return new Promise(function(resolve,request){
	function remove(array) {
		var x = array.filter(e => e.status != true);
		return x;
	}
		fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err)throw(err);
		console.log("todo arrayyyyyyyyy",todoArray)
		var todoDeletedArray = remove(todoArray)
		console.log("todo dalete arrayyyyyyyyy",todoDeletedArray) 
		fs.writeFile('./todo.json', JSON.stringify(todoDeletedArray), 'utf-8', function(err,data) {
		if (err) throw err
		console.log(" clear completed All done",todoDeletedArray);
		});
			resolve(todoDeletedArray);
	  });
	});
 }


function updateInputTodo(updateTextId,updateTxt){
	return new Promise(function(resolve,request){
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err)throw(err);
		function idStatus(updateTxt,updateTextId){
			todoArray.forEach(function(element) {
				if(element.id == updateTextId)
				element.todoapp = updateTxt.data;
			});
			console.log(todoArray);
		}
		idStatus(updateTxt,updateTextId)
		fs.writeFile('./todo.json', JSON.stringify(todoArray), 'utf-8', function(err,data) {
			if (err) throw err
		});
			resolve(todoArray)
	 });
	})
}
module.exports ={getTodo,addTodo,deleteTodo,updateStatusTodo,markAllTodo,unmarkAllTodo,activeTodo,completeTodo,clearCompTodo,updateInputTodo};
