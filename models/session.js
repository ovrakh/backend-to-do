const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SessionSchema = new Schema({
  expDate: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Session', SessionSchema);