const mongoose = require('mongoose');
const Branch = mongoose.model('Branch');
const Client = mongoose.model('Client');
const Supplier = mongoose.model('Supplier');

const create = async (req, res) => {
  let session = null;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const {
      branchName,
      companyName,
      sector,
      type,
      address,
      ContactSurname,
      ContactName,
      phone,
      email,
      name,
      surname,
    } = req.body;

    const branchData = {
      branchName,
      companyName,
      sector,
      type,
      address,
      ContactSurname,
      ContactName,
      phone,
      email,
    };

    let newBranch, createdData;

    try {
      newBranch = await new Branch(branchData).save({ session });

      let relatedData;
      if (type === 'client' || type === 'supplier') {
        relatedData = {
          branch: newBranch._id,
          name: ContactName,
          surname: ContactSurname,
          phone,
          email,
        };

        if (type === 'client') {
          createdData = await new Client(relatedData).save({ session });
        } else if (type === 'supplier') {
          createdData = await new Supplier(relatedData).save({ session });
        } else {
          throw new Error('Invalid type provided in the request');
        }
      } else {
        throw new Error('Invalid type provided in the request');
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        result: { branch: newBranch, [type]: createdData },
        message: `Branch and ${type} created successfully`,
      });
    } catch (error) {
      console.error('Error in transaction', error);
      await session.abortTransaction();
      throw error;
    }
  } catch (err) {
    console.error('Error in create', err);
    return res.status(500).json({
      success: false,
      result: null,
      error: err,
      message: 'Oops there is an Error',
    });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

module.exports = create;