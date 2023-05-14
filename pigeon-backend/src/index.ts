import "dotenv/config";
import express from "express";
import config from "./config";

const app = express();

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${config.PORT}`);
});
