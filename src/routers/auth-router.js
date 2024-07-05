import { Router } from "express";

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { userSignupSchema, userSigninSchema} from "../validation/user-schema.js";
import { loginController, signupController } from "../controllers/auth_controllers.js";

const authRouter = Router();

authRouter.post('/register', validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.post('/login', validateBody(userSigninSchema), ctrlWrapper(loginController));

export default authRouter;
