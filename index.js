require("dotenv").config();
const cors = require("cors");
const express = require("express");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const authRouter = require("./routes/auth-router");
const valueRouter = require("./routes/value-router");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("api/auth", authRouter);
app.use("api/input", valueRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
