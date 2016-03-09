// Server

// ---------------------- Dependencies ---->>
var express = require('express');
var path = require('path');
var winston = require('winston');


// ---------------------- Other Initialization Tasks ---->>
var app = module.exports = express();
var config = require(__dirname + '/config.json');


// Logging
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({}),
        new winston.transports.File({
            filename: config['log'],
            maxsize: '1048576'
        })
    ],
    exitOnError: false,
    handleExceptions: true,
    humanReadableUnhandledException: true
});


// ---------------------- Express ---->>
app.set('title', config['title']);
app.set('port', process.env.PORT || config['port']);
app.enable('trust proxy');
app.use( express.static( path.join( __dirname, config['staticDir'] ) ) );


// Set up Routes
var router = express.Router();

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});


// ---------------------- Home ---->>


app.use(express.static(path.resolve(process.cwd(), 'dist')));

var renderIndex = function(req, res) {
    res.sendFile(path.resolve(__dirname, '../src/', 'index.html'));
};

app.get('/*', renderIndex);

/*
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
//app.use('/libs', express.static(path.resolve(__dirname, 'libs')));

var renderIndex = function(req, res) {
    res.sendFile(path.resolve(__dirname, '../', 'index.html'));
};

app.get('/*', renderIndex);

app.use(router);
*/


// ---------------------- Start Up Server ---->>
app.listen(app.get('port'), function() {
    console.log('Server is listening on port ' + app.get('port') + ' in development mode.');
});

