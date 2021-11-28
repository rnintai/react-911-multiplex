import React, { Component } from "react";
import "./spinner.scss";

class Spinner extends Component {
  render() {
    return (
      <>
        <div className="loading">
          <div className="c c1"></div>
          <div className="c c2"></div>
          <div className="c c3"></div>
        </div>
      </>
    );
  }
}

export default Spinner;
