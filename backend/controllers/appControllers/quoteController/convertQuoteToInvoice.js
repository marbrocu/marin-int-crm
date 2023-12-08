const mongoose = require('mongoose');
const moment = require('moment');

const Model = mongoose.model('Quote');
const InvoiceModel = mongoose.model('Confirmation');

const convertQuoteToInvoice = async (req, res) => {
  try {
    const quoteId = req.params.id; // Assuming the quote ID is passed in the URL
    console.log("TRABAJANDO")

    // Fetch the quote from the database
    const quote = await Model.findById(quoteId);
    //console.log(quote)
    if (!quote) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'Quote not found',
      });
    }

    // If the quote is already converted, prevent creating another invoice
    if (quote.converted) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'Quote is already converted to an invoice.',
      });
    }
    

    const availableItems = quote.items.some((item) => item.quantity > 0);
    if (!availableItems) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'No available items in the quote.',
      });
    }
    
    const itemsWithoutPrice = quote.items.some((item) => item.price === undefined || item.price === null);
    if (itemsWithoutPrice) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'Some items in the quote do not have prices.',
      });
    }
    
    const availableItemsarray = quote.items.some((item) => {
      let totalAvailable = 0; // Initialize the total available quantity for the current item
      
      item.available.forEach((avail) => {
        const values = Object.values(avail);
        if (values.length > 0) {
          const availValue = values[0]; // Safely access the first value if available
          totalAvailable += availValue; // Accumulate the available quantities
        }
      });
    
      // Compare the total available quantity with the item's quantity
      return totalAvailable > item.quantity;
    });
    console.log("TRABAJANDO")
    if (availableItemsarray) {
      return res.status(409).json({
        success: false,
        result: null,
        message: 'Some items in confirmation have more than the quantity.',
      });
    }

    // Convert the quote details to invoice details
    const invoiceData = {
      number: quote.number+"-Incomplete",
      purchaseNumber: quote.number,
      year: quote.year,
      date: moment(),
      expiredDate: moment().add(1, 'month'),
      expiredDatePayment: moment().add(1, 'month'),
      expiredDateShipment: moment().add(1, 'month'),
      shipment: quote.shipment,
      client: quote.client,
      supplier: quote.supplier,
      purchase: quote._id,
      items: quote.items.map((item) => ({
        itemName: item.itemName,
        description: item.description,
        quantity: 0,
        price: item.price,
        total: 0,
        _id : item._id
      })),
      taxRate: quote.taxRate,
      subTotal: 0,
      taxTotal: quote.taxTotal,
      total: 0,
      credit: quote.credit,
      discount: quote.discount,
      note: quote.note,
    };

    // Create the invoice document
    const invoice = await new InvoiceModel(invoiceData).save();

    // Mark the quote as converted
    //quote.converted = true;
    //await quote.save();

    // Return the created invoice
    return res.status(200).json({
      success: true,
      result: quote,
      message: 'Successfully converted purchase to confirmation',
    });
  } catch (err) {
    // If error is because of Invalid ObjectId
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Invalid ID format',
      });
    } else {
      return res.status(500).json({
        success: false,
        result: null,
        message: 'Oops there is an Mistake',
      });
    }
  }
};

module.exports = convertQuoteToInvoice;
