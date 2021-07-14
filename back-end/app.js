const path = require("path");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/** ======================================================================== */
/** CANDIDATE: INSERT ROUTES HERE! ========================================= */
/** ======================================================================== */

app.use("/", require("./routes/index"));

// Error Handling

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log('1111111:', req.app.get("env"));
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: "error",
    error: err.message,
  });
});

module.exports = app;
