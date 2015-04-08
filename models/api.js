var mongoose = require('mongoose');

var apiSchema = mongoose.Schema({
  host: String,
  basePath: String,
  methods: Array
}, {collection: 'api'});

module.exports = mongoose.model('api', apiSchema);
