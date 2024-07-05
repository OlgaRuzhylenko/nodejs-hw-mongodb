import createHttpError from 'http-errors';

import { userService } from '../services/auth-services.js';

export const signupController = async (req, res) => {
  const newUser = await userService.signup(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    data,
  });
};
