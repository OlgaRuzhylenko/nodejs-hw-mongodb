import createHttpError from 'http-errors';
import User from '../db/models/User.js';
import { hashValue } from '../utils/hash.js';
import jwt from 'jsonwebtoken';
import env from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../server.js';

export const findUser = (filter) => User.findOne(filter);

const signup = async (data) => {
  const { password } = data;
  const hashPassword = await hashValue(password);
  return User.create({ ...data, password: hashPassword });
};

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );
  // const resetUrl = `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`;

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );
  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();
  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: env('SMTP_FROM'),
    to: email,
    subject: 'Reset your password',
    // html: `<p>Click <a href="${resetUrl}">here</a> to reset your password!</p>`,
    html,
  });
};

export const userService = { signup };
