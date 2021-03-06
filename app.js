var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var port = process.env.PORT || 8080;
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
var routes = require('./routes/route');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

//local db
//var dbURI = 'mongodb://localhost/directory';
//mongodb atlas cloud
var dbURI = (process.env.NODE_ENV == "production") ? JSON.parse(process.env.dbURI) : process.env.dbURI;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    //console.log('Mongoose connected to dbURI successfully');
});
mongoose.connection.on('error', function (err) {
    //console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    //console.log('Mongoose disconnected');
});

app.get('/getEmployees', routes.getEmployees);
app.post('/addEmployee', routes.addEmployee);    
app.post('/updateEmployee', routes.updateEmployee);
app.post('/removeEmployee', routes.removeEmployee);

app.listen(port, function(){
    //console.log('<=== app running on port: ', port);
})