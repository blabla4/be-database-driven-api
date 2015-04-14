var express = require('express');
var restClient = require('restler');
var router = express.Router();

router.get('/', function(req, res) {
  restClient.get('http://10.134.15.103/apis?populate=methods').on('complete', function(data) {
    res.render('index', {apis: data});
  });
});

router.get('/3d', function(req, res) {
  res.redirect('http://10.134.15.103:3002/');
});

router.get('/tv', function(req, res) {
  res.redirect('http://10.134.15.103:3000/');
});

router.get('/table', function(req, res) {
  res.redirect('http://10.134.15.103:3001/');
});

module.exports = router;
