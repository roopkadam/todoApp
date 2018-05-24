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

//delete function to delete data from json file
function deleteTodo(taskDelete,callback){
	function remove(array, element) {
		var x = array.filter(e => e.id != element);
		return x;
	}
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err) callback(err);
		var todoDeletedArray = remove(todoArray,taskDelete)
		fs.writeFile('./todo.json', JSON.stringify(todoDeletedArray), 'utf-8', function(err,data) {
			if (err) throw err
			console.log("done",todoDeletedArray);
		})
		callback(null,"success");
	});
}


//update function to update status on click of check button
function updateStatusTodo(updateSts,callback){
	console.log("in model", updateSts);
	fs.readFile(path.join(__dirname, '../todo.json'),'utf-8',function(err,data){
		var todoArray = JSON.parse(data);	
		if (err) callback(err);
		function statusChange(updateSts){
			todoArray.forEach(function(element) {
				console.log("elementttttttttt",element)
				if(element.id == updateSts)
				element.status = !element.status;
			});
			console.log(todoArray);
		}
		statusChange(updateSts)
		fs.writeFile('./todo.json', JSON.stringify(todoArray), 'utf-8', function(err,data) {
			if (err) throw err
			console.log("done",todoArray);
		});
	});//readfile
	callback(null,"success")
}


module.exports ={getTodo,addTodo,deleteTodo,updateStatusTodo};

