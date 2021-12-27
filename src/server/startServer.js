import express from "express";

import basicAuth from "../helpers/basicAuth";
import userRouter from "./routes";

const PORT = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/check", (_, res) => {
  res.json({ status: true });
});

app.use("/api", basicAuth, userRouter);

app.use((err, _, res) => {
  return res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Service is up on port ${PORT}`);
});
