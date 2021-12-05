import "./App.css";
import "./reset.css";
import React, { Component } from "react";
import {
  Route,
  Switch,
  Link,
  BrowserRouter as Browser,
} from "react-router-dom";

import Nav from "./components/nav/Nav";
import Card from "./components/main/Card";
import Theater from "./components/main/Theater";
import Footer from "./components/footer/Footer";
// MovieInfo
import Detail from "./components/movie_info/Detail";
import NotFound from "./components/404/Not_found";
import SignUp from "./components/signup/SignUp";
import LogIn from "./components/login/LogIn";
import MovieList from "./components/movie_list/Movie_list";

//theater
import TheaterList from "./components/theater/theater_list";

// reservation
import Reservation from "./pages/reservation/Reservation";
import Seat from "./pages/reservation/Seat";
import ReservationResult from "./pages/reservation/ReservationResult";

// admin
import AdminNavBar from "./components/nav/AdminNavBar";
import AdminMovieInfo from "./pages/admin/movie/AdminMovieInfo";
import AdminMovieSchedule from "./pages/admin/movie/AdminMovieSchedule";

import AdminMultiplex from "./pages/admin/multiplex/AdminMultiplex";

class App extends Component {
  render() {
    return (
      <Browser>
        <Switch>
          <Route>
            {/* <Route path="/"> */}

            <Route path="/" exact>
              <Nav></Nav>
              <Card></Card>
              <Theater></Theater>
            </Route>
            <Route path="/movies" exact>
              <Nav></Nav>
              <MovieList></MovieList>
            </Route>
            {/* movieInfo */}
            <Route path="/movies/detail" component={Nav}></Route>
            <Route
              path="/movies/detail/:movie_id"
              component={Detail}
              exact
            ></Route>
            {/* 예약 */}
            <Route path="/reservation" exact>
              <Nav></Nav>
              <Reservation></Reservation>
            </Route>
            <Route path="/reservation/seat" component={Nav}></Route>
            <Route path="/reservation/seat" component={Seat} exact></Route>
            {/* 결과 */}
            <Route path="/reservation/result" exact>
              <Nav></Nav>
              <ReservationResult></ReservationResult>
            </Route>

            {/*  */}
            <Route path="/404" exact>
              <Nav></Nav>
              <NotFound></NotFound>
            </Route>
            <Route path="/signup" exact>
              <Nav></Nav>
              <SignUp></SignUp>
            </Route>
            <Route path="/login" exact>
              <Nav></Nav>
              <LogIn></LogIn>
            </Route>
            <Route path="/movie_ticker" exact>
              <Nav></Nav>
            </Route>
            <Route path="/theater" exact>
              <Nav></Nav>
              <TheaterList></TheaterList>
            </Route>

            {/* </Route> */}

            {/* admin */}
            <Route path="/admin" exact>
              <AdminNavBar></AdminNavBar>
            </Route>
            <Route path="/admin/movie/info" exact>
              <AdminNavBar></AdminNavBar>
              <AdminMovieInfo></AdminMovieInfo>
            </Route>
            <Route path="/admin/movie/schedule" exact>
              <AdminNavBar></AdminNavBar>
              <AdminMovieSchedule></AdminMovieSchedule>
            </Route>
            <Route path="/admin/multiplex" component={AdminNavBar}></Route>
            <Route
              path="/admin/multiplex"
              component={AdminMultiplex}
              exact
            ></Route>
            <Footer></Footer>
          </Route>
        </Switch>
      </Browser>
    );
  }
}
export default App;
