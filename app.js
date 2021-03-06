
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('lib/log')(module);
var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/error', function(req, res){
    res.render('error', {
        error: "Sorry, on this page was error!"
    });
});

http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});