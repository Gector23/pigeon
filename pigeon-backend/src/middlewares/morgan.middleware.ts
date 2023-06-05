import morgan from "morgan";
import logger from "../utils/logger.util";
import config from "../config";

const stream = {
  write: (message: string) => logger.http(message),
};

const skip = () => {
  const env = config.NODE_ENV;
  return env !== "development";
};

const morganMiddleware = morgan(":method :url :status :req[content-length] :res[content-length] - :response-time ms", {
  stream,
  skip,
});

export default morganMiddleware;
