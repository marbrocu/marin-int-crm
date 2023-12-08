const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const confirmationSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  number: {
    type: String,
    required: true,
  },
  purchaseNumber:{
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  recurring: {
    type: String,
    default: '0',
  },
  shipment: {
    type: String,
    default: '0',
  },
  date: {
    type: Date,
    required: true,
  },
  dateShipment: {
    type: Date,
    required: false,
  },
  expiredDate: {
    type: Date,
    required: false,
  },
  expiredDatePayment: {
    type: Date,
    required: true,
  },
  expiredDateShipment: {
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
  purchase: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quote',
    required: true,
    //autopopulate: true,
  },
  confirmationfile: {
    type: String,
    required: false,
  },
  shipmentfile: {
    type: String,
    required: false,
  },
  shipmentCost: {
    type: Number,
  },
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
    default: 0,
  },
  subTotal: {
    type: Number,
    default: 0,
  },
  taxTotal: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  payment: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Payment',
    },
  ],
  paymentStatus: {
    type: String,
    default: 'unpaid',
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
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

confirmationSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Confirmation', confirmationSchema);
