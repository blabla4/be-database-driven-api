var express = require('express');
var restClient = require('restler');
var router = express.Router();

router.get('/', function(req, res) {
  restClient.get('http://localhost:3000/apis?populate=methods').on('complete', function(data) {
    res.render('index', {apis: data});
  });
});

router.get('/edit', function(req, res) {
    res.render('editMenu', {});
});


router.get('/edit/api', function(req, res) {
    res.render('editApi', {});
});


router.get('/edit/method', function(req, res) {
  restClient.get('http://localhost:3000/apis').on('complete', function(data) {
    res.render('editMethod', {apis: data});
  });
});

module.exports = router;
