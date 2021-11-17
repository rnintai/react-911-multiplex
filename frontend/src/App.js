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
import Movie_info from "./components/movie_info/Movie_info";
import Event_list from "./components/event/Event_list";
import Not_found from "./components/404/Not_found";

class App extends Component {
  render() {
    return (
      <Browser>
        <Switch>
          <Route>
            <Nav></Nav>
            <Route path="/"exact>
              <Card></Card>
              <Event></Event>
              <Theater></Theater>
            </Route>
            <Route path="/movie_info" exact>
              <Movie_info></Movie_info>
              </Route>
            <Route path="/event" exact>
              <Event_list></Event_list>
            </Route>
            <Route path="/404" exact>
              <Not_found></Not_found>
            </Route>
            <Footer></Footer>
          </Route>
        </Switch>
      </Browser>
    );
  }
}
export default App;
