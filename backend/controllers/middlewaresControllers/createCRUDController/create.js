const create = async (Model, req, res) => {
  try {
    // Creating a new document in the collection
    console.log("DESCUBRIENDO")
    console.log(req.body)
    console.log(Model)

    const result = await new Model(req.body).save();
    console.log("prueba")

    // Returning successfull response
    return res.status(200).json({
      success: true,
      result,
      message: 'Successfully Created the document in Model ',
    });
  } catch (err) {
    console.log(err)
    // If err is thrown by Mongoose due to required validations
    if (err.name == 'ValidationError') {
      console.log(err)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Required fields are not supplied',
        error: err,
      });
    } else {
      // Server Error
      return res.status(500).json({
        success: false,
        result: null,
        message: 'Oops there is an Error',
        error: err,
      });
    }
  }
};

module.exports = create;
