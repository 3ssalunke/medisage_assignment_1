import express from "express";

import basicAuth from "../helpers/basicAuth";
import studentRouter from "./routes";

const PORT = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", basicAuth, studentRouter);

app.use((err, _, res) => {
  return res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Service is up on port ${PORT}`);
});
