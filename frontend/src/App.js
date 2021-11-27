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
                <SignUp></SignUp>
              </Route>
              <Route path="/login" exact>
                
              </Route>
              <Route path="/movie_ticker" exact>

              </Route>

              <Route path="/movie_list" exact>
                <Movie_list></Movie_list>

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
