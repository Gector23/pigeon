import { RequestHandler, Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.route("/sign-in").post(authController.signIn as RequestHandler);
authRouter.route("/sign-up").post(authController.signUp as RequestHandler);
authRouter.route("/sign-out").get(authMiddleware, authController.signOut as RequestHandler);
authRouter.route("/refresh").get(authController.refresh as RequestHandler);

export default authRouter;
