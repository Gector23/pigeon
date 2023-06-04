import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import config from "./config";
import router from "./routes";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", router);

const start = async () => {
  await mongoose.connect(config.MONGODB_CONNECTION_STRING);

  app.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${config.PORT}`);
  });
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
