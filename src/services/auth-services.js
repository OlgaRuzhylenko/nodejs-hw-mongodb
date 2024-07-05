import User from "../db/models/User.js";
import bcrypt from 'bcrypt';

export const findUser = filter => User.findOne(filter);

const signup = async (data) => {
    const {password} = data;
    const hashPassword = await bcrypt.hash(password, 10);
    return User.create({...data, password: hashPassword});
};

export const userService = {signup};
