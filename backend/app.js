const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// user
const signUpRouter = require("./routes/member/signUp");
const boxOfficeRouter = require("./routes/movies/boxOffice");
const preMoviesRouter = require("./routes/movies/preMovies");
const moviesDetailRouter = require("./routes/movies/moviesDetail");
const getMoviesListRouter = require("./routes/movies/getMoviesList");
// admin
const updateMovieDetailRouter = require("./routes/admin/movies/updateMovie");
const fetchMoviesRouter = require("./routes/admin/movies/fetchMovies");
const fetchMoviesDetailRouter = require("./routes/admin/movies/fetchMoviesDetail");
var app = express();

// mysql connection
const mysql = require("./mysql");
mysql.getConnection((err, connection) => {
  if (err) {
    switch (err.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("Database connection was closed.");
        break;
      case "ER_CON_COUNT_ERROR":
        console.error("Database has too many connections.");
        break;
      case "ECONNREFUSED":
        console.error("Database connection was refused.");
        break;
    }
  }
  if (connection) return connection.release();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routers
app.use("/member/signup", signUpRouter);
app.use("/movies/boxoffice", boxOfficeRouter);
app.use("/movies/pre", preMoviesRouter);
app.use("/movies/detail", moviesDetailRouter);
app.use("/movies/list", getMoviesListRouter);

app.use("/movies/detail", updateMovieDetailRouter);
app.use("/movies/list/fetch", fetchMoviesRouter);
app.use("/movies/detail/fetch", fetchMoviesDetailRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
