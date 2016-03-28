// Server

// ---------------------- Dependencies ---->>
var express = require('express');
var path = require('path');
var winston = require('winston');


// ---------------------- Other Initialization Tasks ---->>
var app = module.exports = express();
var config = require(__dirname + '/config.json');
var mode = process.env.mode;
var port = config[ mode ]['port'];
var staticDir = config[ mode ]['staticDir'];

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
app.set('title', config[ mode ]['title']);
app.set('port', process.env.PORT || port);
app.enable('trust proxy');
app.use( express.static( path.join( __dirname, staticDir ) ) );


// Set up Routes
var router = express.Router();

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});


// ---------------------- Home ---->>


//app.use(express.static(path.resolve(process.cwd(), 'dist')));

var renderIndex = function(req, res) {
    res.sendFile(path.resolve(path.join( __dirname, staticDir, 'index.html')));
};

app.get('/*', renderIndex);


// ---------------------- Start Up Server ---->>
app.listen(app.get('port'), function() {
    console.log('Server is listening on port ' + port + ' in '+ mode + ' mode.');
});

