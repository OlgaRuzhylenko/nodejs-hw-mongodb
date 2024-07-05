import User from "../db/models/User.js";

const signup = async (data) => User.create(data);

export const userService = {signup};
