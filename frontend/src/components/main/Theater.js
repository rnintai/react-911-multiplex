/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./Theater.css";

class Theater extends Component {
  render() {
    return (
      <div>
        <h1 className="Theater">영화관</h1>
        <div className="Theater_Show">
          <section className="usedTT">
            <h3>안산점</h3>
          </section>
          <section className="usedTT">
            <h3>수원점</h3>
          </section>
          <img src="#" />
          <img src="#" />
          <img src="#" />
          <img src="#" />
          <img src="#" />
          <img src="#" />
          <img src="#" />
          <img src="#" />
        </div>
      </div>
    );
  }
}

export default Theater;
