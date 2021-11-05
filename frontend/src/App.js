import './App.css';
import React, { Component } from 'react';

import Nav from "./components/header/Nav";
import Name from "./components/header/Name";
import Card from "./components/body/Card";
import Theater from "./components/body/Theater";
import Event from "./components/body/Event";
import Footer from "./components/footer/Footer"

class App extends Component {
  render() {
    return (
     <div>
       <header>
        <Name></Name>
        <Nav></Nav>
      </header>
      <body>
        <Card movie1="#" movie2="#" movie3="영화3" movie4="헤헤" movie5="notitle"></Card>
        <Event></Event>
        <Theater></Theater>
        <Footer></Footer>
      </body>

     </div>
    );
  }
}
export default App;
