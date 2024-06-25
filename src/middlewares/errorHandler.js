export const errorHandler = (error, res, req, next) => {
  const { status = 500, message = 'Something went wrong' } = error;
  
  res.status(status).json({
    status,
    message,
    data: error.data,
  });
};
