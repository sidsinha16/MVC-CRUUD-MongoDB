var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser')
mongoose.Promise = global.Promise;

//express
var app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//connection with Mongodb
mongoose.connect("mongodb://localhost:27017/node-demo",{ useNewUrlParser: true },()=>{
	console.log("connected");
});

// //ejs with html
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//schema
var loginSchema = new mongoose.Schema({
	fullName : String,
	userName : String,
	password : String,
	Address : String
});

var login = mongoose.model("login",loginSchema);

app.get('/',function(req,res){
	res.render("login.html")
});


app.post('/success',urlencodedParser,(req,res) =>{
    var logins = new login();
    logins.fullName = req.body.fname;
    logins.userName = req.body.uname;
    logins.password = req.body.pass;
    logins.Address = req.body.address;

    logins.save((err,data)=>{
    	if(err) throw err;
    	res.json(data);
    });
  });

app.listen(3000,()=>{ console.log('Server Started')});