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
	modules.addTodo(task,function(err,data){
		if(err!=null){
    		console.log(err);
		}else{
			res.send(data);
  	}
  });
}

/**
* @function deleteTodo (req,res)
* @description: function is usede to deleting data from json file
*/
var deleteTodo = function(req,res){
	console.log("controllerrr")
  var taskDelete = req.params.id
  console.log(taskDelete)
	modules.deleteTodo(taskDelete,function(err,data){
		if(err!=null){
			console.log(err);
		}else{
			res.send(data);
		}
	});
}

/**
* @function updateStatusTodo (req,res)
* @description: function is usede for updating the status
*/
var updateStatusTodo = function(req,res){
	var updateSts = req.params.id
	modules.updateStatusTodo(updateSts,function(err,data){
		if(err!=null){
			console.log(err);
		}else{
			res.send(data);
		}
	});
}

/**
* @function markAllTodo (req,res)
* @description: function is to mark all the elements
*/
var markAllTodo = function(req,res) {
	console.log("in markAll function")
	modules.markAllTodo(function(err,data){
		if(err !=null){
			console.log(err);
		}else{
			console.log(data);
			res.send(data);
		}
	});
}

/**
* @function unmarkAllTodo (req,res)
* @description: function is to unmark all the elements
*/
var unmarkAllTodo = function(req,res){
	console.log("in unmarkall controller")
	modules.unmarkAllTodo(function(err,data){
		if(err != null){
			console.log(err);
		} else {
			console.log(data);

			res.send(data);
		}
	});
}

/**
* @function unmarkAllTodo (req,res)
* @description: function is to show the active task
*/
var activeTodo = function(req,res) {
	console.log("in active controller")
		var task = req.body.data;
			modules.activeTodo(function(err,data){
      console.log("in active controller")
      if(err != null){
			 console.log(err);
		  } else {
			 console.log(data);
			 res.send(data);
			 console.log("active arrayyyyyyyyyyyy",data)
		  }
		});
	}

/**
* @function completeTodo (req,res)
* @description: function is to show the completed task
*/
	var completeTodo =function(req,res){
		modules.completeTodo(function(err,data){
		console.log("in complete controller");	
		  if(err != null){
			console.log(err);
		  } else {
			 console.log(data);
			 res.send(data);
		  }
	 });
 }

/**
* @function completeTodo (req,res)
* @description: function is to remove all the completed task
*/
 var clearCompTodo = function(req,res){
 	modules.clearCompTodo(function(err,data){
 	console.log("in clear complete controller");
		if(err != null){
		console.log(err);
	  } else {
		 res.send(data);
		 console.log("?????????????????",data);
	   }
	 });
 }



module.exports = {getTodo,addTodo,deleteTodo,updateStatusTodo,markAllTodo,unmarkAllTodo,activeTodo,completeTodo,clearCompTodo};