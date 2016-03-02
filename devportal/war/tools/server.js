// Server

// ---------------------- Dependencies ---->>
//var bodyParser = require('body-parser');
var express = require('express');
//var logger = require('morgan');
//var methodOverride = require('method-override');
var path = require('path');


// ---------------------- Other Initialization Tasks ---->>
var app = module.exports = express();
var config = require(__dirname + '/config.json');


// ---------------------- Express ---->>
app.set('title', config['title']);
app.set('port', process.env.PORT || config['port']);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.enable('trust proxy');
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(require('connect-multiparty')());
//app.use(methodOverride());
//app.use(express.static(path.join(__dirname, '/public')));


// Set up Routes
var router = express.Router();

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

// ---------------------- Home ---->>

router.get('/', function(req, res) {
    //res.render('index');
});

app.use(router);


// ---------------------- Start Up Server ---->>
app.listen(app.get('port'), function() {
    console.log('Server is listening on port ' + app.get('port') + ' in development mode.');
});

