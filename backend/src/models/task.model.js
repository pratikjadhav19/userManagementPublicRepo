const { Schema, model, Types } = require('mongoose');

const taskSchema = new Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  done:        { type: Boolean, default: false },
  owner:       { type: Types.ObjectId, ref: 'User', required: true }, // which user owns it
}, { timestamps: true });

module.exports = model('Task', taskSchema);
