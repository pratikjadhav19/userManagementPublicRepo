const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },   // stored HASHED, never plain
}, { timestamps: true });                        // adds createdAt / updatedAt

module.exports = model('User', userSchema);
