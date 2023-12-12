const mongoose = require('mongoose');
const QuoteModel = mongoose.model('Quote');
const Model = mongoose.model('Confirmation');

const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');
const schema = require('./schemaValidate');

const update = async (req, res) => {
  try {
    let body = req.body;

    /*const { error, value } = schema.validate(body);
    if (error) {
      const { details } = error;
      return res.status(400).json({
        success: false,
        result: null,
        message: details[0]?.message,
      });
    }*/

    const availableItems = body.items.some((item) => item.quantity > 0);
    if (!availableItems) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'No available items in the confirmation.',
      });
    }
    
    console.log(body.number)
    if (body.number.includes('-Incomplete')) {
      // If 'number' exists and contains 'inc' (case insensitive)
      return res.status(409).json({
        success: false,
        result: null,
        message: 'The confirmation has a wrong number identifier.',
      });
    } 
    

    const previousInvoice = await Model.findOne({
      _id: req.params.id,
      removed: false,
    });

    const fromPurchase = await QuoteModel.findOne({
      _id: previousInvoice.purchase,
      removed: false,
    });
    const quoteStatus = fromPurchase.status


    for (const confirmationItem of body.items) {

      const convertedConfirmationItemId = mongoose.Types.ObjectId(confirmationItem._id);
      const matchingQuotationItem = fromPurchase.items.find(
        (quotationItem) =>  quotationItem._id.equals(convertedConfirmationItemId)
      );

      if (matchingQuotationItem) {
        console.log(matchingQuotationItem.available)

        const availIndex = matchingQuotationItem.available.findIndex(
          (avail) => Object.keys(avail)[0] === previousInvoice._id.toString()
        );
    
        if (availIndex !== -1) {
          matchingQuotationItem.available[availIndex][previousInvoice._id] =
            confirmationItem.quantity;
        } else {
          matchingQuotationItem.available.push({
            [previousInvoice._id]: confirmationItem.quantity,
          });
        }
      }
    }



    const { credit } = previousInvoice;

    const { items = [], taxRate = 0, discount = 0 } = req.body;

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Items cannot be empty',
      });
    }

    // default
    let subTotal = 0;
    let taxTotal = 0;
    let total = 0;

    //Calculate the items array with subTotal, total, taxTotal
    items.map((item) => {
      let total = calculate.multiply(item['quantity'], item['price']);
      //sub total
      subTotal = calculate.add(subTotal, total);
      //item total
      item['total'] = total;
    });
    taxTotal = calculate.multiply(subTotal, taxRate);
    total = calculate.add(subTotal, taxTotal);

    body['subTotal'] = subTotal;
    body['taxTotal'] = taxTotal;
    body['total'] = total;
    body['items'] = items;
    body['pdfPath'] = 'confirmation-' + req.params.id + '.pdf';
    // Find document by id and updates with the required fields

    let paymentStatus =
      calculate.sub(total, discount) === credit ? 'paid' : credit > 0 ? 'partially' : 'unpaid';
    body['paymentStatus'] = paymentStatus;


    let availableItemsarray = false;
    let sameCounter = 0
    for (const item of fromPurchase.items) {
      let totalAvailable = 0; // Initialize the total available quantity for the current item
      
      item.available.forEach((avail) => {
        const values = Object.values(avail);
        if (values.length > 0) {
          const availValue = values[0]; // Safely access the first value if available
          totalAvailable += availValue; // Accumulate the available quantities
        }
      });
      
      console.log(totalAvailable);
      console.log(item.quantity);
      
      // Compare the total available quantity with the item's quantity
      if (totalAvailable > item.quantity) {
        availableItemsarray = true;
        break; // Exit the loop if any item has more available quantity than its specified quantity
      }
      else if(totalAvailable === item.quantity){
        sameCounter = sameCounter+1
        if(sameCounter === fromPurchase.items.length){
          quoteStatus = "completed"
        }
      }
    }
    
    if (availableItemsarray) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'Some items in confirmation have more than the quantity.',
      });
    }



    let result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
      new: true, // return the new result instead of the old one
    }).exec();

    // Returning successfull response
    //await save in quote schema
    console.log(fromPurchase.items[0].available)
    fromPurchase.status = quoteStatus
    //fromPurchase.save()
    result = await QuoteModel.findOneAndUpdate({ _id: fromPurchase.id, removed: false}, fromPurchase, {
      new: true, // return the new result instead of the old one
    }).exec();
    

    //custom.generatePdf('Confirmation', { filename: 'confirmation', format: 'A4' }, result);
    return res.status(200).json({
      success: true,
      result,
      message: 'we update this document by this id: ' + req.params.id,
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        error: err,
        message: 'Required fields are not supplied',
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        error: err,
        message: 'Oops there is an Error',
      });
    }
  }
};

module.exports = update;
