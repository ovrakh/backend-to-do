const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  idList: { type: String, required: true },
  task: { type: String, required: true },
  stage: { type: String, default: 'task', required: false}
});

module.exports = mongoose.model('Task', RequestSchema);