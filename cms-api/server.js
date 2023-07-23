import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
import morgan from "morgan";
import cors from "cors";

app.use(cors());
app.use(morgan());
app.use(express.json());

//Database Connection
import mongoConnect from "./src/config/mongoConfig.js";
mongoConnect();

//API
import adminRouter from "./src/router/adminRouter.js";
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running and live.",
  });
});

app.use((error, req, res, next) => {
  const code = error.statusCode || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
