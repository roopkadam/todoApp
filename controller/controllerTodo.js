var modules = require('./../model/model');
/**
* @function showTodo (req,res)
* @description: function get data from the client
*/

var getTodo = function(req,res){
	console.log('---------')
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
  console.log("-----------------",taskDelete)
	modules.deleteTodo(taskDelete,function(err,data){
		if(err!=null){
			console.log(err);
		}else{
			res.send(data);
		}
	});
}


var updateStatusTodo = function(req,res){
	console.log("in updateStatusTodo")
	var updateSts = req.params.id
	console.log("updateeeeee",updateSts)
	modules.updateStatusTodo(updateSts,function(err,data){
		if(err!=null){
			console.log(err);
		}else{
			res.send(data);
		}
	});
}

module.exports = {getTodo,addTodo,deleteTodo,updateStatusTodo};