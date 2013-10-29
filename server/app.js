/**
 * Module dependencies.
 */

var express = require('express'),
    //routes = require('./routes'),
    //api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use(express.methodOverride());
app.use(app.router);

app.use('/app', express.directory(path.join(__dirname, '../app')));
app.use('/app', express.static(path.join(__dirname, '../app')));

app.use(express.directory(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/api', api.index);
app.get('/', function(req,res){
  res.redirect('app/index.html');
});
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// Cross Domains Requests
function allowCrossDomain(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
}
