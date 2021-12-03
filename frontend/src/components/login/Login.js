/* eslint-disable no-useless-constructor */
import axios from "axios";
import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
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
    if (this.state.id === "" || this.state.pw === "")
      alert("아이디/비밀번호를 입력해 주십시오");
    else {
    }
  };

  checkId = async (id) => {
    this.setState({
      [id.target.name]: id.target.value,
    });
    if (this.state.id === "") {
      alert("아이디를 입력해 주십시오");
    } else {
      let checkoutID = await axios.get(
        "https://react-911-multiplex.herokuapp.com/member/checkid/" +
          this.state.id
      );
      if (checkoutID.data === true) {
        alert("존재하지 않는 아이디 입니다");
      } else {
        alert("비밀번호를 입력해 주십시오");
      }
    }
  };

  render() {
    return (
      <div className="Login">
        <input
          placeholder="ID"
          type="text"
          name="id"
          onChange={this.ChangeId}
        ></input>

        <input
          placeholder="비밀번호"
          type="password"
          name="pw"
          onChange={this.ChangePw}
        ></input>

        <button onClick={this.PostLogin}>로그인</button>
      </div>
    );
  }
}
export default Login;
