import { Router } from "express";

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { userSignupSchema, userSigninSchema} from "../validation/user-schema.js";
import { signupController } from "../controllers/auth_controllers.js";

const authRouter = Router();

authRouter.post('/signup', validateBody(userSignupSchema), ctrlWrapper(signupController));

export default authRouter;
