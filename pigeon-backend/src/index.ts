import "dotenv/config";
import { handelError } from "./utils/errors.util";
import startServer from "./server";

process.on("uncaughtException", (error) => {
  handelError(error);
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startServer();
