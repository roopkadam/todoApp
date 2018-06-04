/**
* @description: mpngodb
*/
function mongoDb(){
		return new Promise(function(resolve,reject){
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://localhost:27017/todoApp';
		// Use connect method to connect to the server
		MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
			if(err) throw err;
			//success
			db = client.db('todoApp');
			console.log("Connected successfully to server");
			resolve(db);
		});
	})
}


// get todo function when we load the app
function getTodo (){
	return new Promise(function(resolve,reject){
		mongoDb().then(function(err,success){
			db.collection('table',function(err,collection){
				collection.find().toArray(function(err,documents){
					console.log("documents",documents);
					resolve(documents);
				})
			});		
		}).catch(function(err){
		if(err)throw(err);
		console.log(err);
		});
	});
}

/**
* @function addTodo (task,callBack)
* @description: function is for adding data in json file
*/

function addTodo(task) {
	return new Promise(function(resolve,reject){
		var generateId=  Math.floor(Math.random() * 26) + Date.now();
		mongoDb().then(function(err,success){
			db.collection('table',function(err,collection){
				var tempArry = {
					todoapp:task,
					id: generateId,
					status:false
				}
				collection.insert({todoapp:task,id:generateId,status:false},function(err,result){
					if(err)throw(err)
					resolve(tempArry);
			  });
		  });
		}).catch(function(err){
			if(err)throw(err);
			console.log(err);		
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
		mongoDb().then(function(err,success){
			db.collection('table',function(err,collection){
				if(err)throw(err)
				console.log(err)
		 		collection.deleteOne({id:idValue},function(err,success){
					if(err)throw(err)
					resolve("success");
				});
			});
		}).catch(function(err){
				if(err)throw(err);
				console.log(err);
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
	return new Promise(function(resolve,reject){
		mongoDb().then(function(err,success){
			db.collection('table',function(err,collection){
				if(err)throw(err)
				console.log(err)
				collection.updateMany({},{ $set: { status: true } } ,function(err,success){
					if(err)throw(err)
					resolve("success")
				});		
			});
		}).catch(function(err){
			if(err)throw(err)
			console.log(err)
		});
	});
}

/**
* @function unmarkAllTodo(callback)
* @description: function is to uncheck all the elements
*/
function unmarkAllTodo(){
	return new Promise(function(resolve,reject){
		mongoDb().then(function(err,success){
			db.collection('table',function(err,collection){
				if(err)throw(err)
				console.log(err)
			collection.updateMany({},{ $set : { status: false } },function(err,success){
				if(err)throw(err)
				resolve("success")
		  	});
			});
		}).catch(function(err){
			if(err)throw(err)
			console.log(err)
		});
	});
}

/**
* @function activeTodo(callback)
* @description: function is to show all active tasks
*/
function activeTodo(){
	return new Promise(function(resolve,reject){
		mongoDb().then(function(err,success){
			db.collection('table',function(err,collection){
				if(err)throw(err)
				console.log(err)
				collection.find({ status : false }).toArray(function(err,success){
					if(err)throw(err)
					console.log(err)
					resolve(success)
				});
			});
		}).catch(function(err){
			if(err)throw(err)
			console.log(err)
		});
	});
}

/**
* @function completeTodo(callback)
* @description: function is to show all completed tasks
*/
function completeTodo(){
	return new Promise(function(resolve,reject){
		mongoDb().then(function(err,success){
			db.collection('table',function(err,collection){
				if(err)throw(err)
				console.log(err)
				collection.find({ status : true}).toArray(function(err,success){
					if(err)throw(err)
					console.log(err)
				resolve(success)
				});
			});
		}).catch(function(err){
			if(err)throw(err)
			console.log(err)
		});
	});
}

/**
* @function clearCompTodo(callback)
* @description: function is to rempve all completed tasks from json file
*/
function clearCompTodo(){
	return new Promise(function(resolve,reject){
		mongoDb().then(function(err,success){
			db.collection('table',function(err,collection){
				if(err)throw(err)
				console.log(err)
			 collection.remove( { status : true }, function(err,success){
				if(err)throw(err)
				console.log(err)
			  resolve(success)
			 });
			});
		}).catch(function(err){
			if(err)throw(err)
			console.log(err)
		});
	});
}

/**
* @function updateInputTodo(updateTextId,updateTxt)
* @description: function is update text when edited from client side
*/
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
