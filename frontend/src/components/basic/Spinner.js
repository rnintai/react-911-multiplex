import React, { Component } from "react";
import "./spinner.scss";

function Spinner({ color }) {
  return (
    <>
      <div className="loading">
        <div className="c c1" style={{ backgroundColor: color }}></div>
        <div className="c c2" style={{ backgroundColor: color }}></div>
        <div className="c c3" style={{ backgroundColor: color }}></div>
      </div>
    </>
  );
}

export default Spinner;
