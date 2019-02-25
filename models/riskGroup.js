const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RiskGroupSchema = new Schema({
  name: { type: String, unique: true, required: true },
  // to think about adding array of users, which belongs to this group
});

module.exports = mongoose.model('RiskGroup', RiskGroupSchema);