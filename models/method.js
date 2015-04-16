var mongoose = require('mongoose');

var methodSchema = mongoose.Schema({
  name: String,
  description: String,
  type: String,
  parameters: Array,
}, {collection: 'method'});

module.exports = mongoose.model('method', methodSchema);
