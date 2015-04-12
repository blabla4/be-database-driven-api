var express = require('express');
var restClient = require('restler');
var router = express.Router();

router.get('/', function(req, res) {
  restClient.get('http://localhost:3000/apis?populate=methods').on('complete', function(data) {
    res.render('index', {apis: data});
  });
});

module.exports = router;
