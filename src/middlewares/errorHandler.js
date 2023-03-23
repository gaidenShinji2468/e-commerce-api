const errorHandler = (err, req, res, next) => {
  if(err.name === "SequelizeValidationError") {
    const errObj = {};
    err.errors.map(er => {
      errObj[er.path] = er.message;
    });
    
    res.status(400).json({
      statusCode: 400,
      ...errObj
    });
  }

  if(err.name === "SequelizeForignKeyConstraintError") {
    res.status(400).json({
      statusCode: 400,
      message: err.message,
      error: err.parent.detail
    });
  }

  if(err.name === "SequelizeDatabaseError") {
    res.status(400).json({
      statusCode: 400,
      message: err.message
    });
  }

  res.status(500).json({
    statusCode: 500,
    message: err.message,
    error: err
  });
}

module.exports = errorHandler;
