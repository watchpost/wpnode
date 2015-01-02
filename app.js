var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// mongo
mongoose.connect('mongodb://wpdba:lim1t<$Plz@ds045097.mongolab.com:45097/wpostdb', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

// models ----------------------------------------------------------
var UserModel = mongoose.model('users', { fname: String, lname: String});

// routes ----------------------------------------------------------
app.get('/api/users', function(req, res){
    UserModel.find(function(err, retval){
        if(err){
            res.send(err);
        }else{
            res.json(retval);
        }
    });
});
app.get('/api/users/:userid', function(req, res){
    UserModel.find({
        _id : req.params.userid
    }, function(err, retval){
        if(err){
            res.send(err);
        }else{
            res.json(retval);
        }
    });
});
app.post('/api/users', function(req, res){
    console.log('req.body: ' + req.body.fname);
    UserModel.create({
        fname: req.body.fname,
        lname: req.body.lname
    }, function(err, retval){
        if(err){
            res.send(err);
        }else{
            res.json(retval);
        }
    });
});
app.delete('/api/users/:userid', function(req, res){
    UserModel.remove({
        _id: req.params.userid
    }, function(err, retval){
        if(err){
            res.send(err);
        }else{
            res.json(retval);
        }
    });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// application ------------------------------------------------------
app.get('*', function(req, res){
    res.sendfile('./public/index.html');
});
module.exports = app;
app.listen(8080);
console.log("App listening on port 8080");