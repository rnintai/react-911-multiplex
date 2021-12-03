import "./App.css";
import "./reset.css";
import React, { Component } from "react";
import {
  Route,
  Switch,
  Link,
  BrowserRouter as Browser,
} from "react-router-dom";

import Nav from "./components/nav/nav";
import Card from "./components/main/Card";
import Theater from "./components/main/Theater";
import Footer from "./components/footer/Footer";
// MovieInfo
import Detail from "./components/movie_info/Detail";
import NotFound from "./components/404/Not_found";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import MovieList from "./components/movie_list/Movie_list";

// admin
import AdminNavBar from "./components/nav/AdminNavBar";
import AdminMovieInfo from "./pages/admin/movie/adminMovieInfo";
import AdminMovieSchedule from "./pages/admin/movie/adminMovieSchedule";

// reservation test
import Reservation from "src/pages/admin/movie/reservation";

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
            <Route
              path="/movies/detail/:movie_id"
              exact={true}
              component={Detail}
            ></Route>
            {/* 예약 */}
            <Route path="/reservation" exact>
              <Nav></Nav>
              <Reservation></Reservation>
            </Route>
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
              <Login></Login>
            </Route>
            <Route path="/movie_ticker" exact>
              <Nav></Nav>
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
            <Footer></Footer>
          </Route>
        </Switch>
      </Browser>
    );
  }
}
export default App;
