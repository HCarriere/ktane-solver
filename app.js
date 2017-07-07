'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);


const modules = require('./app/modules');

// Express configuration
app
.use(express.static(__dirname + '/views/assets'));  // styles
server.timeout = 0;


let handlebars = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
});

// handlebars configuration
app
.engine('.hbs', handlebars.engine)
.set('view engine', '.hbs')
.set('views', path.join(__dirname, 'views/pages'));


// Routes
app
.get('/', (req, res) => {
	res.render('home', {
        modules: modules.getModules(),
	});
})


.get('*', (req, res) => {
	res.render('error', {
		err: '404',
	});
});


// Error handler //////////
app.use((err, req, res, next) => {
  console.log('Express error handler):' + err);
  res.status(500).render('error', {
	  err: err,
  });
});

// application launch
server.listen(port, (err) => {
    if(err) {
        return console.log('Node launch error', err);
    }
    console.log(`Diskanalyzer listening to *:${port})`);
});


/**
 * send a JSON to response header
 * @param  {[Object]} response
 * @param  {[Object]} json
 */
function sendJSON(response, json) {
	response.contentType('application/json');
	response.send(JSON.stringify(json, null, 4));
}
