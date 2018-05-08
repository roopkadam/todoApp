const express = require('express');

var app = express();
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);
app.set('views',__dirname+'/views');

app.use(express.static(__dirname + '/public'));


//takes the port number from heroku process.env is used to take port number
//if it does'nt get any port number it will run locally through port no 3000
const port = process.env.PORT || 3000;

app.get('/', (req,res) => { //it will show about page
	res.render('indexTodo',{
	pageTitle: 'todo'
	});
});


//it will run prog by taking port number from heroku
app.listen(port,() => {
console.log(`server is on port `+port);
});