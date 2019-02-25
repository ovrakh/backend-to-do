const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  name: { type: String, required: true },
  isFinished: { type: Boolean, required: true, default: false },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  riskGroups: [{ type: Schema.Types.ObjectId, ref: 'RiskGroup' }],
  created: { type: Number, default: Date.now() }
});

module.exports = mongoose.model('Request', RequestSchema);