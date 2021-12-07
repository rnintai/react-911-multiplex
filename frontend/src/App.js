import "./App.css";
import "./reset.css";
import axios from "axios";
import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Browser } from "react-router-dom";

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
import Employee from "./pages/admin/employee/AdminEmployee";
import ResetPw from "./pages/user/mypage/ResetPw";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("authenticated") || "",
      userInfo: {},
    };
  }

  async componentDidMount() {
    if (this.state.token !== "") {
      const res = await axios.post(API + "/member/info", {
        token: localStorage.getItem("authenticated"),
      });
      this.setState({ userInfo: res.data.data });
    }
  }

  render() {
    return (
      <Browser>
        <Switch>
          <Route>
            {/* <Route path="/"> */}
            <Route
              path="/"
              render={(props) => (
                <>
                  <Nav userInfo={this.state.userInfo}></Nav>
                  <Card {...props}></Card>
                  <Theater {...props}></Theater>
                </>
              )}
              exact
            ></Route>
            <Route path="/movies" exact>
              <Nav userInfo={this.state.userInfo}></Nav>
              <MovieList></MovieList>
            </Route>
            {/* movieInfo */}
            <Route
              path="/movies/detail"
              render={() => <Nav userInfo={this.state.userInfo}></Nav>}
            ></Route>
            <Route
              path="/movies/detail/:movie_id"
              component={Detail}
              exact
            ></Route>
            {/* 예약 */}
            <Route
              path="/reservation"
              render={() => <Nav userInfo={this.state.userInfo}></Nav>}
            ></Route>
            {/* <Route path="/reservation" component={Reservation} exact></Route> */}
            <Route
              path="/reservation"
              render={(props) => <Reservation {...props} />}
              exact
            ></Route>
            {/* <Route path="/reservation" component={Reservation} exact></Route> */}
            <Route
              path="/reservation/seat"
              render={(props) => (
                <Seat {...props} userId={this.state.userInfo.member_id} />
              )}
              exact
            ></Route>
            {/* 결과 */}
            <Route path="/reservation/result" exact>
              <ReservationResult></ReservationResult>
            </Route>
            {/*  */}
            <Route path="/404" exact>
              <Nav userInfo={this.state.userInfo}></Nav>
              <NotFound></NotFound>
            </Route>
            <Route path="/signup" exact>
              <Nav userInfo={this.state.userInfo}></Nav>
              <SignUp></SignUp>
            </Route>
            <Route path="/login" exact>
              <Nav userInfo={this.state.userInfo}></Nav>
              <LogIn></LogIn>
            </Route>
            {/* 마이페이지 */}
            <Route
              path="/mypage"
              render={() => <Nav userInfo={this.state.userInfo}></Nav>}
            ></Route>
            <Route path="/mypage/resetpw" component={ResetPw} exact></Route>
            <Route path="/movie_ticker" exact>
              <Nav userInfo={this.state.userInfo}></Nav>
            </Route>
            <Route path="/theater" exact>
              <Nav userInfo={this.state.userInfo}></Nav>
              <TheaterList></TheaterList>
            </Route>
            {/* </Route> */}
            {/* admin */}
            <Route path="/admin" exact>
              <AdminNavBar userInfo={this.state.userInfo}></AdminNavBar>
            </Route>
            <Route path="/admin/movie/info" exact>
              <AdminNavBar userInfo={this.state.userInfo}></AdminNavBar>
              <AdminMovieInfo></AdminMovieInfo>
            </Route>
            <Route path="/admin/movie/schedule" exact>
              <AdminNavBar userInfo={this.state.userInfo}></AdminNavBar>
              <AdminMovieSchedule></AdminMovieSchedule>
            </Route>
            <Route
              path="/admin/multiplex"
              render={() => (
                <AdminNavBar userInfo={this.state.userInfo}></AdminNavBar>
              )}
            ></Route>
            <Route
              path="/admin/multiplex"
              component={AdminMultiplex}
              exact
            ></Route>
            <Route
              path="/admin/employee"
              render={() => (
                <AdminNavBar userInfo={this.state.userInfo}></AdminNavBar>
              )}
            ></Route>
            <Route
              path="/admin/employee"
              render={(props) => <Employee {...props}></Employee>}
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
