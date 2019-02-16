var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var port = process.env.PORT || 8080;

var routes = require('./routes/route');

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

//local db
//var dbURI = 'mongodb://localhost/directory';
//mongodb atlas cloud
var dbURI = 'mongodb://rajmalakpet:rajmalakpet@cluster0-shard-00-00-otjuy.mongodb.net:27017,cluster0-shard-00-01-otjuy.mongodb.net:27017,cluster0-shard-00-02-otjuy.mongodb.net:27017/directory?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

app.get('/getEmployees', routes.getEmployees);
app.post('/addEmployee', routes.addEmployee);    
app.post('/updateEmployee', routes.updateEmployee);
app.post('/removeEmployee', routes.removeEmployee);

app.listen(port, function(){
    console.log('<=== app running on port: ', port);
})