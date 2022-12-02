const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'nodelogin'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(request, response) {
	// Login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/tracker' , function (request , response ) {
    response.sendFile( __dirname + "/tracker.html");
  });

app.get('/trackercss' , function (request , response ) {
    response.sendFile( __dirname + "/tracker.css");
  });

app.get('/indexjs' , function (request , response ) {
    response.sendFile( __dirname + "/index.js");
  });

app.post('/auth', function(request, response) {
	// Input fields
	let username = request.body.username;
	let password = request.body.password;
	// Input fields exists and are not empty
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
        response.redirect('/tracker')
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000, () => console.log("Server running on 3000"));