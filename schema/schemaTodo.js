var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todoApp');
console.log('Successfully connected mongoose');

var db = mongoose.connection;
var Schema = mongoose.Schema;

var todoSchema = new Schema({
	todoapp :{
		type :String,
		validate :{
			validator:function(v){
			return v !== null
			},
				message :'You should give some input'
		}
	},

	id :{
		type :Number,
		validate :{
			validator:function(v){
				return v.length !==13
			},
			message :'wrong id input is coming'
		}
	},

	status :{
		type :Boolean,
		required :true,
		validate:{
			validator:function(v){
				return v ==false
			},
			message :'By default status shouls be false'
		}
	}
})
 var schemas = mongoose.model('Table', todoSchema);
 module.exports={schemas};



