const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const quoteSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  converted: {
    type: Boolean,
    default: false,
  },
  number: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  expiredDate: {
    type: Date,
    required: true,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true,
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier',
    required: true,
    autopopulate: true,
  },
  purchasefile: {
    type: String,
    required: false,
  },
  frominvoices:[{
    invoiceNumber: {
      type: String,
      required: true,
    },
  }
  ],
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      available: {
        type: Number,
        required: false,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  taxRate: {
    type: Number,
  },
  subTotal: {
    type: Number,
  },
  taxTotal: {
    type: Number,
  },
  total: {
    type: Number,
  },
  credit: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: 'draft',
  },
  pdfPath: {
    type: String,
    default: '',
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

quoteSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Quote', quoteSchema);
