/**
* @description: mongodb
*/
const {schemas} = require('../schema/schemaTodo');


// get todo function when we load the app
function getTodo (){
	return new Promise(function(resolve,reject){
		schemas.find({})
			.exec(function (err, success) {
				if (err) {
					reject('error occured')
				} 
				else {
					console.log(success);
					resolve(success); 
				}
		});
	});
}

/**
* @function addTodo (task,callBack)
* @description: function is for adding data in json file
*/

function addTodo(task) {
	console.log("task",task)
	return new Promise(function(resolve,reject){
		var generateId=  Math.floor(Math.random() * 26) + Date.now();
		var add = new schemas({ todoapp: task,id : generateId, status :false});
		add.save(function (err,success) {
			if (err) throw(err);
			resolve(success)
			// saved!
		});
	});
}

/**
* @function deleteTodo(taskDelete,callback)
* @description: function is for deleting data from json file
*/
function deleteTodo(taskDelete){
	return new Promise(function(resolve,reject){
		var idValue  = parseFloat(taskDelete);
		schemas.deleteOne({ id: idValue }, function (err,success) {
    if (err) throw(err);
  	resolve(success)
    });
	});
}


/**
* @function updateStatusTodo(updateSts,callback)
* @description: function is for updating status on click of check button in json file 
*/
function updateStatusTodo(updateSts,updateText){
	// console.log("update status",updateSts)
	// 	console.log("update text",updateText.data)
	var idValue = parseFloat(updateSts);
	return new Promise(function(resolve,reject){
	schemas.update({ id : idValue }, { $set :{status : updateText.data} }, function(err, success) {
		if(err)throw(err)
			resolve("success")
	 });
 });
}


/**
* @function markAllTodo(callback)
* @description: function is to check all the elements
*/
function markAllTodo() {
	return new Promise(function(resolve,reject){
		schemas.updateMany({status : true}, function(err,success) {
			if(err)throw(err)
			resolve(success)
		})
	});
}

/**
* @function unmarkAllTodo(callback)
* @description: function is to uncheck all the elements
*/
function unmarkAllTodo(){
	return new Promise(function(resolve,reject){
		schemas.updateMany({status : false}, function(err,success) {
			if(err)throw(err)
			resolve(success)
		})
	});
}

/**
* @function activeTodo(callback)
* @description: function is to show all active tasks
*/
function activeTodo(){
	return new Promise(function(resolve,reject){
		schemas.find({status :false},function (err, success) {
			if(err)throw(err)
			resolve(success)
		});
	});
}

/**
* @function completeTodo(callback)
* @description: function is to show all completed tasks
*/
function completeTodo(){
	return new Promise(function(resolve,reject){
		schemas.find({status :true},function (err, success) {
			if(err)throw(err)
			resolve(success)
		});
	});
}

/**
* @function clearCompTodo(callback)
* @description: function is to rempve all completed tasks from json file
*/
function clearCompTodo(){
	return new Promise(function(resolve,reject){
		schemas.deleteMany({status : true}, function(err,success) {
			if(err)throw(err)
			resolve("success")
		});
	});
}

/**
* @function updateInputTodo(updateTextId,updateTxt)
* @description: function is update text when edited from client side
*/
function updateInputTodo(updateTextId,updateTxt){
	// console.log("updateTextId",updateTextId)
	// console.log("updateTxt",updateTxt.data)
	var idValue = parseFloat(updateTextId);
	return new Promise(function(resolve,reject){
		schemas.updateOne({id : idValue },{$set : {todoapp : updateTxt.data}}, function(err,success){
			if(err)throw(err)
			resolve(success)
		})
	});
}


function write(result){
	fs.writeFile(directoryName, JSON.stringify(result), 'utf-8', function(err,data) {	
		if (err) throw(err);
		console.log(result);
	});
}

module.exports ={getTodo,addTodo,deleteTodo,updateStatusTodo,markAllTodo,unmarkAllTodo,activeTodo,completeTodo,clearCompTodo,updateInputTodo};
