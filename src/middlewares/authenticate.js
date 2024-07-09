import createHttpError from 'http-errors';

const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  // console.log(authHeader);

  if (!authHeader) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const [Bearer, token] = authHeader.split(' ');
  if (Bearer !== 'Bearer') {
    return next(createHttpError(401, 'Token must have bearer type'));
  }
  if (!token) {
    return next(createHttpError(401, 'Token missing'));
  }
};

export default authenticate;
