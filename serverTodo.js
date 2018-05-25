const express = require('express');
const parser = require('body-parser');
const routes = require('./routes/routesTodo');

var app = express();
// var fs = require('fs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);
app.set('views',__dirname+'/views');

app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;
app.use(parser.json());

app.use(routes);

// //it will run prog by taking port number from heroku
app.listen(port,() => {
	console.log(`server is on port `+port);
});