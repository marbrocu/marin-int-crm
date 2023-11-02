const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const branchSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  branchName: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  companyName: {
    type: String,
    trim: true,
    required: true,
  },
  sector: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  ContactSurname: {
    type: String,
    trim: true,
    required: true,
  },
  ContactName: {
    type: String,
    trim: true,
    required: true,
  },
  bankAccount: {
    type: String,
    trim: true,
  },
  companyRegNumber: {
    type: String,
    trim: true,
  },
  companyTaxNumber: {
    type: String,
    trim: true,
  },
  companyTaxID: {
    type: String,
    trim: true,
  },
  customField: [
    {
      fieldName: {
        type: String,
        trim: true,
      },
      fieldValue: {
        type: String,
        trim: true,
      },
    },
  ],
  address: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  fax: {
    type: String,
    trim: true,
  },
  cell: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  website: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Branch', branchSchema);
