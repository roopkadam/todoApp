const express = require('express');
const fs = require('fs');
var app = express();
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);
app.set('views',__dirname+'/view');
//takes the port number from heroku process.env is used to take port number
//if it does'nt get any port number it will run locally through port no 3000
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/help'));//use to run help.html page

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;//to show now,method,url on console
	console.log(log);
	fs.appendFile('server.log',log + '\n');
    next();
 });

// app.get('/', (req,res) => {
// 	// res.send('<h1>Hello express</h1');
// 	res.json({
// 	pageTitle: 'About',
// 	name:'roop',
// 	likes: [
// 	'Biking',
// 	'citties']
// 	});
// });

app.get('/indexTodo', (req,res) =>{ //it will show about page
	res.render('about',{
	pageTitle: 'Index'
	});
});

app.get('/about', (req,res) =>{ //it will show about page
	res.render('about',{
	pageTitle: 'About'
	});
});

app.get('/projects',(req,res)=>{
	res.render('projects',{
	pageTitle: 'Projects'
	});
});



app.get('/help', (req,res) =>{
	res.send('help --------- page')
});

// It will run the file locally through port no 3000
// app.listen(3000, ()=>{
// 	console.log('server is running');//show msg on command prompt
// });


//it will run prog by taking port number from heroku
app.listen(port,() => {
console.log(`surver is on port ${port}`);
});