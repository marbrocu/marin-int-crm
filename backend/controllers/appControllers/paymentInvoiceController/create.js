const mongoose = require('mongoose');

const Model = mongoose.model('PaymentInvoice');
const Confirmation = mongoose.model('Confirmation');
const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');

const create = async (req, res) => {
  try {
    console.log(req.body)
    // Creating a new document in the collection
    /*if (req.body.amount === 0) {
      return res.status(202).json({
        success: false,
        result: null,
        message: `The Minimum Amount couldn't be 0`,
      });
    }*/

    const currentConfirmation = await Confirmation.findOne({
      _id: req.body.invoice,
      removed: false,
    });
    

    //console.log(currentConfirmation)

    const {
      total: previousTotal,
      discount: previousDiscount,
      credit: previousCredit,
    } = currentConfirmation;

    const maxAmount = calculate.sub(calculate.sub(previousTotal, previousDiscount), previousCredit);

    if (req.body.amount > maxAmount) {
      return res.status(202).json({
        success: false,
        result: null,
        message: `The Max Amount you can add is ${maxAmount}`,
      });
    }

    const result = await Model.create(req.body);
    

    const fileId = 'payment-invoice-report-' + result._id + '.pdf';
    
    const updatePath = await Model.findOneAndUpdate(
      { _id: result._id.toString(), removed: false },
      { pdfPath: fileId },
      {
        new: true,
      }
    ).exec();
    
    // Returning successfull response
    
    
    console.log("result")
    const { _id: paymentInvoiceId, amount } = result;
    const { id: invoiceId, total, discount, credit } = currentConfirmation;
    console.log(invoiceId)
    console.log(total)
    console.log(discount)
    console.log(credit)

    let paymentStatus =
      calculate.sub(total, discount) === calculate.add(credit, amount)
        ? 'paid'
        : calculate.add(credit, amount) > 0
        ? 'partially'
        : 'unpaid';
    
    console.log("try")
    console.log(req.body.invoice)
    const invoiceUpdate = await Confirmation.findOneAndUpdate(
      { _id: req.body.invoice },
      {
        $push: { payment: paymentInvoiceId.toString() },
        $inc: { credit: amount },
        $set: { paymentStatus: paymentStatus },
      },
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    ).exec();

    await custom.generatePdf(
      'PaymentInvoice',
      { filename: 'payment-invoice-report', format: 'A4' },
      invoiceUpdate
    );

    res.status(200).json({
      success: true,
      result: updatePath,
      message: 'Payment created successfully',
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      res.status(400).json({
        success: false,
        result: null,
        message: 'Required fields are not supplied',
        error: err,
      });
    } else {
      // Server Error
      res.status(500).json({
        success: false,
        result: null,
        message: 'Oops there is an Error',
        error: err,
      });
    }
  }
};

module.exports = create;
