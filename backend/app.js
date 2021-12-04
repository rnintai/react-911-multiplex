const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// user
const signUpRouter = require("./routes/member/signUp");
const checkIdRouter = require("./routes/member/checkId");
const checkEmailRouter = require("./routes/member/checkEmail");
const checkPhoneRouter = require("./routes/member/checkPhone");
const memberInfoRouter = require("./routes/member/memberInfo");
const loginRouter = require("./routes/member/login");
// movie
const boxOfficeRouter = require("./routes/movies/boxOffice");
const preMoviesRouter = require("./routes/movies/preMovies");
const moviesDetailRouter = require("./routes/movies/moviesDetail");
const getMoviesListRouter = require("./routes/movies/getMoviesList");
// ticket
const getMovieScheduleRouter = require("./routes/tickets/schedule");
const reservationRouter = require("./routes/tickets/reservation");
const reservedSeatRouter = require("./routes/tickets/reservedSeat");
// theater
const theaterSeatRouter = require("./routes/admin/theater/theaterSeat");

// admin
const uploadPosterRouter = require("./routes/admin/movies/uploadPoster");
const fetchMoviesRouter = require("./routes/admin/movies/fetchMovie");
const fetchMovieDetailRouter = require("./routes/admin/movies/fetchMovieDetail");
const movieScheduleRouter = require("./routes/admin/tickets/movieSchedule");
const multiplexRouter = require("./routes/admin/multiplex/multiplexList");
const theaterRouter = require("./routes/admin/theater/theaterList");
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

// user
app.use("/member/signup", signUpRouter);
app.use("/member/checkid", checkIdRouter);
app.use("/member/checkemail", checkEmailRouter);
app.use("/member/checkphone", checkPhoneRouter);
app.use("/member/info", memberInfoRouter);
app.use("/member/login", loginRouter);
// movies
app.use("/movies/boxoffice", boxOfficeRouter);
app.use("/movies/pre", preMoviesRouter);
app.use("/movies/detail", moviesDetailRouter);
app.use("/movies/list", getMoviesListRouter);
// tickets
app.use("/tickets/schedule", getMovieScheduleRouter);
app.use("/tickets/reservation", reservationRouter);
app.use("/tickets/reservedseat", reservedSeatRouter);
// theaters
app.use("/theater/seat", theaterSeatRouter);

// admin
app.use("/movies/detail/poster", uploadPosterRouter);
app.use("/movies/list/fetch", fetchMoviesRouter);
app.use("/movies/detail/fetch", fetchMovieDetailRouter);

app.use("/admin/tickets/schedule", movieScheduleRouter);
app.use("/admin/multiplex", multiplexRouter);
app.use("/admin/theater", theaterRouter);

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
