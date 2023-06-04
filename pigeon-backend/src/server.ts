import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./routes";
import errorHandleMiddleware from "./middlewares/error-handle.middleware";
import config from "./config";

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use("/api", router);
  app.use(errorHandleMiddleware);

  await mongoose.connect(config.MONGODB_CONNECTION_STRING);

  app.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${config.PORT}`);
  });
};

export default startServer;
