const fs = require('fs');
var path = require("path");
// get todo function callback
function getTodo (){
	return new Promise(function(resolve,reject){
		fs.readFile(directoryName, 'utf8', function (err, data) {
		var parseData = JSON.parse(data)
		if (err) throw(err);
		console.log(data);
		resolve(parseData);
		});
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
		var objectArray;
		fs.readFile(directoryName,'utf-8',function(err,data){
			var todoArray = JSON.parse(data);	
			console.log("mmmmmmm",todoArray)
			var tempArry = {
				todoapp: task,
				id: generateId,
				status:false
			}
			todoArray .push(tempArry);
			write(todoArray);
			resolve(tempArry)
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
			var x = array.filter(e => e.id != element);
			return x;
		}
		fs.readFile(directoryName,'utf-8',function(err,data){
			var todoArray = JSON.parse(data);	
			console.log(todoArray)
			if (err) throw(err);
			var todoDeletedArray = remove(todoArray,taskDelete)
			write(todoDeletedArray);
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
		fs.readFile(directoryName,'utf-8',function(err,data){
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
			write(todoArray);
			resolve(todoArray)
		});
	});
}

/**
* @function markAllTodo(callback)
* @description: function is to check all the elements
*/
function markAllTodo() {
	return new Promise(function(resolve,request){
		fs.readFile(directoryName,'utf-8',function(err,data){
			var todoArray = JSON.parse(data);	
			if (err)throw(err);
			todoArray.forEach(function(element) {
				element.status = true;
			});
			write(todoArray)
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
		fs.readFile(directoryName,'utf-8',function(err,data){
			var todoArray = JSON.parse(data);	
			console.log(todoArray)
			if (err) throw(err);
			todoArray.forEach(function(element){
				element.status = false;
			});	
			write(todoArray)
			resolve(todoArray)
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
		fs.readFile(directoryName,'utf-8',function(err,data){
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
		fs.readFile(directoryName,'utf-8',function(err,data){
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
		fs.readFile(directoryName,'utf-8',function(err,data){
			var todoArray = JSON.parse(data);	
			if (err)throw(err);
			console.log(todoArray)
			var todoDeletedArray = remove(todoArray)
			console.log(todoDeletedArray) 
			write(todoDeletedArray)
			resolve(todoDeletedArray);
		});
	});
}


function updateInputTodo(updateTextId,updateTxt){
	return new Promise(function(resolve,request){
	fs.readFile(directoryName,'utf-8',function(err,data){
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
			write(todoArray)
			resolve(todoArray)
		});
	})
}


function write(result){
	fs.writeFile(directoryName, JSON.stringify(result), 'utf-8', function(err,data) {	
		if (err) throw(err);
		console.log(result);
	});
}

module.exports ={getTodo,addTodo,deleteTodo,updateStatusTodo,markAllTodo,unmarkAllTodo,activeTodo,completeTodo,clearCompTodo,updateInputTodo};
