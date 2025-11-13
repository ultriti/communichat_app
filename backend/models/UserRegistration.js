const mongoose = require('mongoose');

const EmailVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  firstName: { type: String }
});


const UserRegisterModel = mongoose.model('EmailVerification', EmailVerificationSchema);
module.exports = UserRegisterModel;
