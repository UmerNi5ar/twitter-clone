const AppError = require('../utils/AppError');
module.exports = (error, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res
      .status(500)
      .json({ message: 'Something went wrong please try again later' });
  }

  if (error.name === 'ValidationError') {
    console.log(error.stack);

    return res.status(400).json({
      status: 'Unsuccessful',
      message: error.message,
    });
  }
  if (error.code === 11000) {
    console.log(error.stack);

    return res.status(400).json({
      status: 'fail',
      message: 'User already exists',
    });
  }
  console.log(error.stack);
  res.status(500).json({
    status: 'fail',
    message: error.message,
    code: error.code,

    error: error.name,
    error: error.stack,
  });
};
