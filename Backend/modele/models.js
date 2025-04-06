const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "telecaller"],
    default: "telecaller" // ✅
  },
  address: String,
});




module.exports = mongoose.model('mod', userSchema);
