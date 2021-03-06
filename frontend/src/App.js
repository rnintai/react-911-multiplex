/* eslint-disable no-undef */
import "./App.css";
import "./reset.css";
import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Browser } from "react-router-dom";
import axios from "axios";

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

// mypage
import ResetPw from "./pages/user/mypage/ResetPw";
import MyReservation from "./pages/user/mypage/MyReservation";
// admin
import AdminNavBar from "./components/nav/AdminNavBar";

// 영화관리
import AdminMovieInfo from "./pages/admin/movie/AdminMovieInfo";
import AdminMovieSchedule from "./pages/admin/movie/AdminMovieSchedule";
// 지점관리
import AdminMultiplex from "./pages/admin/multiplex/AdminMultiplex";
import AdminMultiplexDetail from "./pages/admin/multiplex/AdminMultiplexDetail";
// 직원관리
import Employee from "./pages/admin/employee/AdminEmployee";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("authenticated") || "",
      isAdmin: "",
    };
  }
  getData = async () => {
    let response = await axios.get(
      "https://react-911-multiplex.herokuapp.com/member/info/" +
        this.state.userId
    );
    this.setState({ isAdmin: response.data.data.isAdmin });
  };
  componentDidMount() {
    if (this.state.userId !== "") {
      this.getData();
    }
  }
  render() {
    return (
      <Browser>
        <Switch>
          <Route>
            <Route
              path="/"
              render={(props) => (
                <>
                  <Nav></Nav>
                  <Card {...props}></Card>
                  <Theater {...props}></Theater>
                </>
              )}
              exact
            ></Route>
            <Route path="/movies" component={Nav}></Route>
            <Route path="/movies" component={MovieList} exact></Route>
            {/* movieInfo */}
            <Route path="/movies/detail"></Route>
            <Route
              path="/movies/detail/:movie_id"
              component={Detail}
              exact
            ></Route>
            {/* 예약 */}
            <Route path="/reservation" component={Nav}></Route>
            {/* <Route path="/reservation" component={Reservation} exact></Route> */}
            <Route
              path="/reservation"
              render={(props) => (
                <>
                  <Reservation {...props} />
                </>
              )}
              exact
            ></Route>
            <Route
              path="/reservation/seat"
              render={(props) => <Seat {...props} userId={this.state.userId} />}
              exact
            ></Route>
            {/* 결과 */}
            <Route
              path="/reservation/result"
              render={() => (
                <ReservationResult
                  userId={this.state.userId}
                  exact
                ></ReservationResult>
              )}
            ></Route>
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
            {/* 마이페이지 */}
            <Route path="/mypage" component={Nav}></Route>
            <Route path="/mypage/resetpw" component={ResetPw} exact></Route>
            <Route
              path="/mypage/reservation"
              render={(...props) => (
                <MyReservation
                  {...props}
                  userId={this.state.userId}
                ></MyReservation>
              )}
              exact
            ></Route>
            {/* <Route path="/movie_ticker" exact>
              <Nav></Nav>
            </Route> */}
            <Route path="/theater" exact>
              <Nav></Nav>
              <TheaterList></TheaterList>
            </Route>
            {/* </Route> */}
            {/* admin */}
            <Route
              path="/admin"
              render={(props) => (
                <AdminNavBar {...props} userId={this.state.userId} />
              )}
            ></Route>
            <Route path="/admin" exact></Route>
            <Route path="/admin/movie/info" exact>
              <AdminMovieInfo></AdminMovieInfo>
            </Route>
            <Route path="/admin/movie/schedule" exact>
              <AdminMovieSchedule></AdminMovieSchedule>
            </Route>
            {/* 지점관리 */}
            <Route
              path="/admin/multiplex"
              component={AdminMultiplex}
              exact
            ></Route>
            <Route
              path="/admin/multiplex/detail"
              component={AdminMultiplexDetail}
              exact
            ></Route>
            {/*  */}
            <Route path="/admin/employee"></Route>
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
