const paginatedListExpired = async (Model, req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = page * limit - limit;
    try {
      //  Query the database for a list of all results
      const resultsPromise = Model.find({ removed: true })
        .skip(skip)
        .limit(limit)
        .sort({ created: 'desc' })
        .populate();
      // Counting the total documents
      
      const countPromise = Model.count({ removed: true });
      // Resolving both promises
      const [result, count] = await Promise.all([resultsPromise, countPromise]);
      // Calculating total pages
      //console.log(result)
      //console.log(count)
      const pages = Math.ceil(count / limit);
      //console.log(pages)
  
      // Getting Pagination Object
      const pagination = { page, pages, count };
      if (count > 0) {
        return res.status(200).json({
          success: true,
          result,
          pagination,
          message: 'Successfully found all documents',
        });
      } else {
        return res.status(203).json({
          success: true,
          result: [],
          pagination,
          message: 'Collection is Empty',
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        result: [],
        message: 'Oops there is an Error',
        error: err,
      });
    }
  };
  
  module.exports = paginatedListExpired;
  