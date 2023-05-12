import express from "express";

const app = express();

const port = 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${port}`);
});
