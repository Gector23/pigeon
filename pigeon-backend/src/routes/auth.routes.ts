import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import validationMiddleware from "../middlewares/validation.middleware";
import { SignInBody, SignUpBody } from "../validations/auth.validation";

const authRouter = Router();

authRouter.route("/sign-in").post(validationMiddleware(SignInBody), authController.signIn);
authRouter.route("/sign-up").post(validationMiddleware(SignUpBody), authController.signUp);
authRouter.route("/sign-out").get(authMiddleware, authController.signOut);
authRouter.route("/refresh").get(authController.refresh);

export default authRouter;
