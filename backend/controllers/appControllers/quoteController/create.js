const mongoose = require('mongoose');

const Model = mongoose.model('Quote');
const InvoiceModel = mongoose.model('Invoice');

const custom = require('@/controllers/middlewaresControllers/pdfController');

const { calculate } = require('@/helpers');

function flattenItems(items) {
  return items.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenItems(val)) : acc.concat(val), []);
}

const create = async (req, res) => {
  try {

    const invoiceObj = req.body.quotes.map(item => item.quote);

    // Fetch invoices from the Invoice model based on IDs
    const invoices = await InvoiceModel.find({ _id: { $in: invoiceObj } });
    for (const invoice of invoices) {
      for (const item of invoice.items) {
        item.available = []; // Adding the "available" field
        
      }
    }


    const clientBranches = invoices.map(invoice => invoice.client.branch);
    const areClientBranchesEqual = clientBranches.every(branch => JSON.stringify(branch) === JSON.stringify(clientBranches[0]));

    // Check if all supplier branches are the same
    const supplierBranches = invoices.map(invoice => invoice.supplier.branch);
    const areSupplierBranchesEqual = supplierBranches.every(branch => JSON.stringify(branch) === JSON.stringify(supplierBranches[0]));

    // Check if the object IDs of invoices are unique
    const invoiceIds = invoices.map(invoice => invoice._id);
    const areInvoiceIdsUnique = new Set(invoiceIds).size === invoiceIds.length;

  
    let modifiedItems = invoices.map(invoice => invoice.items);

    // Log the modified items for verification
    modifiedItems = modifiedItems.flat();

    
    const statuses = invoices.map(invoice => invoice.status);
    const areStatusesEqual = statuses.every(status => status === 'quotation');

    if (!areStatusesEqual) {
      throw new Error('Not all invoices have the status "quotation"');
    }

    // Throw error if any condition is not met
    if (!areClientBranchesEqual) {
      const error = new Error('Client branches are not equal');
      error.name = 'ClientBranchesError';
      error.details = JSON.stringify({ clientBranches });
      throw error;
    }
    if (!areSupplierBranchesEqual) {
      const error = new Error('Supplier branches are not equal');
      error.name = 'SupplierBranchesError';
      error.details = JSON.stringify({ supplierBranches });
      throw error;
    }
    if (!areInvoiceIdsUnique) {
      const error = new Error('Invoice IDs are not unique');
      error.name = 'InvoiceIdsError';
      error.details = JSON.stringify({ invoiceIds });
      throw error;
    }

    // Handle the fetched invoices as needed, maybe combine them or process further


    let { items = [], taxRate = 0, discount = 0 } = req.body;
    items = modifiedItems


    

    // default
    let subTotal = 0;
    let taxTotal = 0;
    let total = 0;
    // let credit = 0;

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

    let body = req.body;
    
    body['subTotal'] = subTotal;
    body['taxTotal'] = taxTotal;
    body['total'] = total;
    body['items'] = items;
    body['client'] = invoices[0].client
    body['supplier'] = invoices[0].supplier

    // Transforming req.quotes into a compatible format
    const transformedQuotes = req.body.quotes.map(quoteObj => {
      return { invoiceNumber: quoteObj.quote };
    });
    body['frominvoices'] = transformedQuotes
    console.log(body)

    // Creating a new document in the collection
    const result = await new Model(body).save();
    const fileId = 'invoice-' + result._id + '.pdf';
    const updateResult = await Model.findOneAndUpdate(
      { _id: result._id },
      { pdfPath: fileId },
      {
        new: true,
      }
    ).exec();
    // Returning successfull response

    custom.generatePdf('Quote', { filename: 'quote', format: 'A4' }, result);


    await InvoiceModel.updateMany(
      { _id: { $in: invoiceObj } },
      { $set: { removed: true } }
    );

    // Returning successfull response
    return res.status(200).json({
      success: true,
      result: updateResult,
      message: 'Quote created successfully',
    });
  } catch (err) {
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Required fields are not supplied',
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        message: err.message,
      });
    }
  }
};
module.exports = create;
