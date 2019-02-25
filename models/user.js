const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true, default: '5a8d4e8e4c6bf017c5bfb921' },
  role: { type: String, enum: [ 'admin', 'user' ], default: 'user', required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  riskGroups: [{ type: Schema.Types.ObjectId, ref: 'RiskGroup' }],
  results: [{ type:Schema.Types.ObjectId, ref: 'Result' }],
  sex: { type: String, enum: [ 'male', 'female', 'absent' ], default: 'absent' },
  name: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  created: { type: Number, default: Date.now() }
});

UserSchema.statics.findUserByEmail = async function (email) {
  let user = await this.findOne({ email });
  
  if (!user) {
    throw 'User not found.'
  }

  return user; 
};

UserSchema.methods.update = function(body) {
  [ 'email', 'sex', 'name', 'phoneNumber', 'company' ].forEach(key => {
    this[key] = body[key] || this[key];
  });
  return this.save();
};

UserSchema.methods.clear = function(...fields) {
  let result = {};

  if (fields && fields.length) {
    fields.forEach(key => result[key] = this[key]);
  } else {
    [ 'company', 'email', 'sex', 'name', 'phoneNumber', 'created', 'id', 'role' ]
      .forEach(key => result[key] = this[key]);
  }

  return result;
};

module.exports = mongoose.model('User', UserSchema);