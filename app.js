const express = require("express");
const path = require("path");
const app = express();
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const userRouter = require("./routes/userRoute");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  console.log("hello from the middleware");
  req.requesTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use((err, req, res, next) => {
  console.error("ERROR:", err); // Log the error for debugging purposes
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Something went wrong!",
  });
});

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(cookieparser());
app.use(mongoSanitize());

///Mounting routers
app.use("/api/v1/users", userRouter);

module.exports = app;
