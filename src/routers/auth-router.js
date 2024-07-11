import { Router } from "express";

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { userSignupSchema, userSigninSchema} from "../validation/user-schema.js";
import { loginController, signupController, refreshController, logoutController, requestResetEmailController } from "../controllers/auth_controllers.js";
import { requestResetEmailSchema } from "../validation/requestResetEmailSchema.js";

const authRouter = Router();

authRouter.post('/register', validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.post('/login', validateBody(userSigninSchema), ctrlWrapper(loginController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post('/auth/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

export default authRouter;
