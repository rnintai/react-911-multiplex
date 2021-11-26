import './App.css';
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
import MovieInfo from "./components/movie_info/Movie_info";
import EventList from "./components/event/Event_list";
import NotFound from "./components/404/Not_found";
import SignUp from "./components/singup/SignUp";
import All_movies from "./components/all_movies/All_movies";

class App extends Component {
  render() {
    return (
      <Browser>
        <Switch>
          <Route>
            <Route path="/">
              <Nav></Nav>
              
              <Route path="/"exact>
                <Card></Card>
                <Event></Event>
                <Theater></Theater>
              </Route>
              <Route path="/movie-info" exact>
                <MovieInfo></MovieInfo>
              </Route>
              <Route path="/event" exact>
                <EventList></EventList>
              </Route>
              <Route path="/404" exact>
                <NotFound></NotFound>
              </Route>
              <Route path="/signup" exact>
                <SignUp></SignUp>
              </Route>
              <Route path="/login" exact>
                
              </Route>
              <Route path="/movie_ticker" exact>

              </Route>

              <Route path="/All_movies" exact>
                <All_movies></All_movies>
                
              </Route>

              <Route path="/" exact>

              </Route>                
              <Footer></Footer>
            </Route>
          </Route>
        </Switch>
      </Browser>
    );
  }
}
export default App;
