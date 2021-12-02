/* eslint-disable no-useless-constructor */
import axios from "axios";
import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Login">
        <input placeholder="ID" type="text" name="id"></input>
        <input placeholder="비밀번호" type="password" name="pw"></input>
        <button>로그인</button>
      </div>
    );
  }
}

export default Login;
