var express = require('express');
var vm = require('vm');
var mongoose = require('mongoose');
var api = require('../models/api');
var method = require('../models/method');

var router = express.Router();

rest = require('restler');

router.get('/:api/:method/*', function(req, res) {
  response = res;
  argument = req.url.split('/').slice(3);
  var _api = req.params.api;
  var _method = req.params.method;
  api.findOne({basePath: _api}, function (err, api) {
    api.methods.forEach(function(methodId) {
      method.findById(methodId, function(err, method) {
        if(method.name == _method) {
          var script = vm.createScript(method.script);
          script.runInThisContext();
        }
      });
    });
  });
});

module.exports = router;
