const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  code: { type: String, unique: false, required: false },
  name: { type: String, unique: true, required: true },
  created: { type: Number, default: Date.now() }
});

module.exports = mongoose.model('List', ListSchema);
