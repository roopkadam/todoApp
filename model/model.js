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
function addTodo(task,callBack) {
	var generateId=  Math.floor(Math.random() * 26) + Date.now();
	var objectArray = require('../todo.json');
	var tempArry = {
		todoapp: task,
		id: generateId,
		status:false
	}
	objectArray.push(tempArry);
	fs.writeFile(path.join(__dirname,'../todo.json'), JSON.stringify(objectArray), 'utf-8', function(err,data) {	
		if (err) callBack(err);
		console.log("from model----------------------------------",objectArray);
		callBack(null,tempArry);
	});
}

/**
* @function deleteTodo(taskDelete,callback)
* @description: function is for deleting data from json file
*/
function deleteTodo(taskDelete,callback){
	function remove(array, element) {
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~",element);
		var x = array.filter(e => e.id != element);
		return x;
	}
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		console.log("@@@@@@@@@@@@",todoArray)
		if (err) callback(err);
		var todoDeletedArray = remove(todoArray,taskDelete)
		fs.writeFile('./todo.json', JSON.stringify(todoDeletedArray), 'utf-8', function(err,data) {
			if (err) throw err
			console.log("done",todoDeletedArray);
		})
		callback(null,"success");
	});
}

/**
* @function updateStatusTodo(updateSts,callback)
* @description: function is for updating status on click of check button in json file 
*/
function updateStatusTodo(updateSts,callback){
	console.log("in model", updateSts);
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err) callback(err);
		function statusChange(updateSts){
			todoArray.forEach(function(element) {
				if(element.id == updateSts)
				element.status = !element.status;
			});
			console.log(todoArray);
		}
			console.log("data::::::::::::::::::::::::::::::::::",todoArray);

		statusChange(updateSts)
		fs.writeFile('./todo.json', JSON.stringify(todoArray), 'utf-8', function(err,data) {
			if (err) throw err
		});
			callback(null,"success")
	});//readfile
}

/**
* @function markAllTodo(callback)
* @description: function is to check all the elements
*/
function markAllTodo(callback) {
	console.log("------------------------")
		fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err) callback(err);
			todoArray.forEach(function(element) {
				element.status = true;
		});
			fs.writeFile('./todo.json', JSON.stringify(todoArray), 'utf-8', function(err,data) {
			if (err) throw err
			console.log("done",todoArray);
		});
     callback(null,"success")
});
}

/**
* @function unmarkAllTodo(callback)
* @description: function is to uncheck all the elements
*/
function unmarkAllTodo(callback){
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err) callback(err);
		todoArray.forEach(function(element){
			element.status = false;
		});	
		fs.writeFile('./todo.json', JSON.stringify(todoArray), 'utf-8', function(err,data) {
			if (err) throw err
			console.log("unmark All done",todoArray);
		});
			callback(null,"success")
	});
}

/**
* @function activeTodo(callback)
* @description: function is to show all active tasks
*/
function activeTodo(callback){
	console.log("in active model");
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		console.log("**********************",todoArray)
		if (err) callback(err);
		var activeArray = todoArray.filter(function(element){
			console.log("&&&&&&&&&&&&&&&&&&&",element)
			if(element.status != true){
			return element;
			}
		});	
		callback(null,activeArray)
	});
}

/**
* @function completeTodo(callback)
* @description: function is to show all completed tasks
*/
function completeTodo(callback){
	console.log("in complete model");
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		console.log("1111111111111111111111",todoArray)
		if (err) callback(err);
		var completeArray = todoArray.filter(function(element){
			if(element.status !=false){
				return element;
			}
		});
		callback(null,completeArray);
   });
 }

/**
* @function clearCompTodo(callback)
* @description: function is to rempve all completed tasks from json file
*/
function clearCompTodo(callback){
	function remove(array) {
		var x = array.filter(e => e.status != true);
		return x;
	}
		fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err) callback(err);
		console.log("@@@@@@@@@@@@",todoArray)
		var todoDeletedArray = remove(todoArray)
		console.log("aaaaaaaaaaaaaaaaa",todoDeletedArray) 
		fs.writeFile('./todo.json', JSON.stringify(todoDeletedArray), 'utf-8', function(err,data) {
		if (err) throw err
		console.log(" clear completed All done",todoDeletedArray);
		});
			callback(null,"success");
	});
 }


module.exports ={getTodo,addTodo,deleteTodo,updateStatusTodo,markAllTodo,unmarkAllTodo,activeTodo,completeTodo,clearCompTodo};
