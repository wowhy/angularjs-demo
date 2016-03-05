var express = require('express'),
    router = express.Router();

require('./services/sample.js')(router);

module.exports = router;