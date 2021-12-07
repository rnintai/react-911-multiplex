/* eslint-disable no-restricted-globals */
import axios from "axios";
import React, { Component } from "react";
import "./LogIn.css";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pw: "",
    };
  }

  appChangeId = (id) => {
    this.setState({
      [id.target.name]: id.target.value,
    });
  };

  appChangePw = (pw) => {
    this.setState({
      [pw.target.name]: pw.target.value,
    });
  };

  PostLogin = (id, pw) => {
    if (this.state.id === "" || this.state.pw === "") {
      alert("아이디/비밀번호를 입력해 주십시오");
    } else {
      // let checkoutID = axios.get(API + "/member/checkid/" + this.state.id);
      // if (checkoutID.data === false) {
      //   alert("가입되지 않은 ID 입니다.");
      // } else {
      let checkLogin = axios
        .post(API + "/jwt/login", {
          userId: this.state.id,
          password: this.state.pw,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.loginSuccess === true) {
            let success = response.data.token;
            localStorage.setItem("authenticated", success);
            // alert("확인.");
            location.href = "/";
          } else {
            alert(response.data.message);
          }
        });
      // }
    }
  };

  render() {
    return (
      <div className="LogIn">
        <input
          placeholder="ID"
          type="text"
          name="id"
          onChange={this.appChangeId}
        ></input>
        <input
          placeholder="비밀번호"
          type="password"
          name="pw"
          onChange={this.appChangePw}
        ></input>
        <button onClick={this.PostLogin}>로그인</button>
      </div>
    );
  }
}
export default LogIn;
