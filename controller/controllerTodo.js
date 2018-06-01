var modules = require('./../model/model');
/**
* @function showTodo (req,res)
* @description: function get data from the client
*/

var getTodo = function(req,res){
		modules.getTodo(function(err,data){
			if(err!=null){
				console.log(err);
			}else{
				res.render('indexTodo.html',{
				pageTitle: 'My To do List',
				toShowData : data
			  });
			}
	 });
	}

/**
* @function addTodo (req,res)
* @description: function is usede to adding data to json file
*/
	var addTodo =function (req,res){
		var task = req.body.data;
		// console.log("taskkkkkkkkkk",task)
		modules.addTodo(task).then(
			function(data){
				// console.log("promiseeeee",data)
				res.send(data);
			}).catch(
				function(err){
				if(err)throw (err)
				});	
	  	}


/**
* @function deleteTodo (req,res)
* @description: function is usede to deleting data from json file
*/
var deleteTodo = function(req,res){
	console.log("controllerrr")
  var taskDelete = req.params.id
  console.log("taskDeleteeeeeee",taskDelete)
	modules.deleteTodo(taskDelete).then(
		function(data){
			console.log("datattatata",data)
			res.send(data);
		}).catch(
		function(err){
			if(err)throw(err)
		});
	}


/**
* @function updateStatusTodo (req,res)
* @description: function is usede for updating the status
*/
var updateStatusTodo = function(req,res){
	var updateSts = req.params.id
		// console.log("pppppppppppppppppp",updateSts)
	modules.updateStatusTodo(updateSts).then(

		function(data){
			res.send(data);
		}).catch(
		function(err){
			if(err)throw(err)
		});
}

/**
* @function markAllTodo (req,res)
* @description: function is to mark all the elements
*/
var markAllTodo = function(req,res) {
	console.log("in markAll function")
	modules.markAllTodo().then(
		function(data){
			res.send(data);
		}).catch(
		function(err){
			if(err)throw(err)
		});
	}


/**
* @function unmarkAllTodo (req,res)
* @description: function is to unmark all the elements
*/
var unmarkAllTodo = function(req,res){
	console.log("in unmarkall controller")
	modules.unmarkAllTodo().then(
		function(data){
			res.send(data);
		}).catch(
		function(err){
			if(err)throw(err)
		});
	}


/**
* @function unmarkAllTodo (req,res)
* @description: function is to show the active task
*/
var activeTodo = function(req,res) {
	console.log("in active controller")
		var task = req.body.data;

			modules.activeTodo().then(
				function(data){
					res.send(data);
				}).catch(
				function (err){
					if(err)throw(err)
		});
	}

/**
* @function completeTodo (req,res)
* @description: function is to show the completed task
*/
	var completeTodo =function(req,res){
		modules.completeTodo().then(
			function(data){
				res.send(data);
			}).catch(
			function(err){
				if(err)throw(err)
			});	
 }

/**
* @function completeTodo (req,res)
* @description: function is to remove all the completed task
*/
 var clearCompTodo = function(req,res){
 	modules.clearCompTodo().then(
 		function(data){
 			console.log("ccccccccccccccccc",data)
 			res.send(data);
 		}).catch(
 		function(err){
 			if(err)throw(err)
 		});
 }


var updateInputTodo = function(req,res){
	var updateTextId = req.params.id;
	var updateTxt = req.body;
	modules.updateInputTodo(updateTextId,updateTxt).then(
		function(data){
			// console.log("DDDDDDDDDDDDDDDDDDDDD",data)
			res.send(data.todoapp);
		}).catch(
		function(err){
			if(err)throw(err)
	});
}

module.exports = {getTodo,addTodo,deleteTodo,updateStatusTodo,markAllTodo,unmarkAllTodo,activeTodo,completeTodo,clearCompTodo,updateInputTodo};