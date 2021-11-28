import './App.css';
import './reset.css';
import React, { Component } from 'react';
import {
  Route,
  Switch,
  Link,
  BrowserRouter as Browser,
} from "react-router-dom";

import Nav from "./components/nav/Nav";
import Card from "./components/main/Card";
import Theater from "./components/main/Theater";
import Event from "./components/main/Event";
import Footer from "./components/footer/Footer";
// MovieInfo
import Mov20218256 from "./components/movie_info/20218256";
import Mov20210087 from "./components/movie_info/20210087";
import Mov20218052 from "./components/movie_info/20218052";
import Mov20210865 from "./components/movie_info/20210865";
import Mov20210683 from "./components/movie_info/20210683";
import EventList from "./components/event/Event_list";
import NotFound from "./components/404/Not_found";
import SignUp from "./components/singup/SignUp";
import Movie_list from "./components/movie_list/Movie_list";

// admin
import AdminNavBar from './components/nav/AdminNavBar';
import AdminMovieInfo from './pages/admin/movie/adminMovieInfo'
import AdminMovieSchedule from './pages/admin/movie/adminMovieSchedule'

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
              <Event></Event>
              <Theater></Theater>
            </Route>
            {/* movieInfo */}
            <Route path="/20218256" exact>
              <Mov20218256></Mov20218256>
            </Route>
            <Route path="/20210087" exact>
              <Mov20210087></Mov20210087>
            </Route>
            <Route path="/20218052" exact>
              <Mov20218052></Mov20218052>
            </Route>
            <Route path="/20210865" exact>
              <Mov20210865></Mov20210865>
            </Route>
            <Route path="/20210683" exact>
              <Mov20210683></Mov20210683>
            </Route>
            <Route path="/event" exact>
              <EventList></EventList>
            </Route>
            <Route path="/404" exact>
              <NotFound></NotFound>
            </Route>
            <Route path="/signup" exact>
              <Nav></Nav>
              <SignUp></SignUp>
            </Route>
            <Route path="/login" exact>
              <Nav></Nav>
              
            </Route>
            <Route path="/movie_ticker" exact>
              <Nav></Nav>

            </Route>

            <Route path="/movie_list" exact>
              <Movie_list></Movie_list>
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
