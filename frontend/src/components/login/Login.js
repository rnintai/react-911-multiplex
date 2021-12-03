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

  PostSignup = (id, pw) => {
    if (this.state.id === "" || this.state.pw === "")
      alert("아이디/비밀번호를 입력해 주십시오");
    else {
      if (this.state.CKid === "" || this.state.CKpw === "") {
        alert("아이디/비밀번호를 다시 확인해 주십시오");
      } else {
        alert("아이디 : " + this.state.CKid);
        // axios.post("https://react-911-multiplex.herokuapp.com/user/login", {});
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
