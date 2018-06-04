const express = require('express');
const parser = require('body-parser');
const routes = require('./routes/routesTodo');

/**
@description for using mongodb
*/



/**
@description path for switching on environment (development/testing)
*/
switch(process.env.NODE_ENV) {
case 'development':
directoryName = './apptodo.json';
break;
case 'testing':
directoryName = './apptodoTest.json';
break;

default:
console.log("Please provide proper environment");
}



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

module.exports={app};