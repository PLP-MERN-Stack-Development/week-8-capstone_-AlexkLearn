// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const fields = Object.keys(err.errors);
    message = `Validation error on: ${fields.join(', ')}`;
  }

  // Duplicate key error (like unique email/phone)
  if (err.code && err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue);
    message = `Duplicate value: ${duplicateField.join(', ')} already exists`;
  }

  // Cast error (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};