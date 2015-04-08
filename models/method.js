var mongoose = require('mongoose');

var methodSchema = mongoose.Schema({
  name: String,
  script: String
}, {collection: 'method'});

module.exports = mongoose.model('method', methodSchema);
