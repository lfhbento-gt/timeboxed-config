/* global module*/
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    let scriptSrc = req.app.get('env') === 'production' ? '/app.min.js' : '/app.js';
    res.render('index', { title: 'Timeboxed', scriptSrc: scriptSrc });
});

router.get('/pebble-apps/timeboxed/config/', function(req, res) {
    let scriptSrc = req.app.get('env') === 'production' ? '/app.min.js' : '/app.js';
    res.render('index', { title: 'Timeboxed', scriptSrc: scriptSrc });
});

module.exports = router;
