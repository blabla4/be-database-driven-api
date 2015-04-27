var express = require('express');
var vm = require('vm');
var mongoose = require('mongoose');
var api = require('../models/api');
var method = require('../models/method');

var router = express.Router();

restClient = require('restler');
helper = require('../helper/helper');

router.get('/:api/:method/*', function(req, res) {
  response = res;
  argument = req.url.split('/').slice(3);
  var apiName = req.params.api;
  var methodName = req.params.method;
  api.findOne({name: apiName}, function (err, _api) {
    host = _api.host;
    _api.methods.forEach(function(methodId) {
      method.findById(methodId, function(err, _method) {
        if(_method.name == methodName) {
          vm.createScript(_method.script).runInThisContext();
        }
      });
    });
  });
});

module.exports = router;
