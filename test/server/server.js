var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser');

var app = express(),
    router = express.Router();

//all environments
app.set('port', process.env.PORT || 8000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.use(function (req, res, next) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    next();
});

app.use('/', express.static(path.join(__dirname, '../../src/')));

app.use('/', function (req, res, next) {
    if (req.path.startsWith('/api') ||
        req.path.startsWith('/assets') ||
        req.path.startsWith('/admin') ||
        req.path.startsWith('/views')) {
        return next();
    } else {
        if (req.path.endsWith('.html')) {
            return next();
        }

        return res.sendfile(path.join(__dirname, '../../src/index.html'));
    }
});

app.use('/admin/', function (req, res, next) {
    res.sendfile(path.join(__dirname, '../../src/admin.html'))
});


// api
app.use('/api', require('./api'));

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
