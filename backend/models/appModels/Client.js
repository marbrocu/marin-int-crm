const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const clientSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  branch: {
    type: mongoose.Schema.ObjectId,
    ref: 'Branch',
    required: true,
    autopopulate: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
clientSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Client', clientSchema);
