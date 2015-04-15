var mongoose = require('mongoose');

var methodSchema = mongoose.Schema({
  name: String,
  description: String,
  type: String,
  parameters: Array,
  script: String
}, {collection: 'method'});

module.exports = mongoose.model('method', methodSchema);
