import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

//Database Connection
import mongoConnect from "./src/config/mongoConfig.js";
mongoConnect();

//middlewares
import morgan from "morgan";
import cors from "cors";

app.use(cors());
app.use(morgan());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running and live.",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
