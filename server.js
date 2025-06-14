const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const usersRoutes = require("./routes/usersRoutes");
const errorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/AppError");
const path = require("path");
const limiter = require("./middlewares/rateLimiter");
const helmet = require("helmet");
const { sanitizeMongoInput } = require("express-v5-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");

const app = express();

// config
dotenv.config();
// // pug , ejs , setup view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// body parser
app.use(express.json()); // app.use => application level middleware , parses the request body to the json format
app.use(morgan("dev"));
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(sanitizeMongoInput);
app.use(xss());
app.use(hpp());

// routes
app.use("/api/v1/users", usersRoutes);

// 404 error handler , always put it after all the routes
app.use((req, res, next) => {
  // res.render("404");
  next(new AppError("Route not found", 404));
});

// global error middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`✅✅ Server is running on port ${process.env.PORT}`);
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("✅✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.log("❌❌ Error connecting to MongoDB", err);
    });
});
