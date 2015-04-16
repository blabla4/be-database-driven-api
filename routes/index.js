var express = require('express');
var restClient = require('restler');
var router = express.Router();

/* Api doc */
router.get('/', function(req, res) {
  restClient.get('http://10.134.15.103/apis?populate=methods').on('complete', function(data) {
    res.render('index', {apis: data});
  });
});

/* Api création */
router.get('/create', function(req, res) {
  res.render('create');
});

/* Api édition */
router.get('/edit', function(req, res) {
  restClient.get('http://10.134.15.103/apis?populate=methods').on('complete', function(data) {
    res.render('edit', {apis: data});
  });
});

/* Redirect plan 3d */
router.get('/3d', function(req, res) {
  res.redirect('http://10.134.15.103:3002/');
});

/* Redirect tv */
router.get('/tv', function(req, res) {
  res.redirect('http://10.134.15.103:3000/');
});

/* Redirect table interactive */
router.get('/table', function(req, res) {
  res.redirect('http://10.134.15.103:3001/');
});

module.exports = router;
