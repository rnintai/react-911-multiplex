/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-constructor */
import axios from "axios";
import React, { Component } from "react";
import "./LogIn.css";

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

  PostLogIn = (id, pw) => {
    if (this.state.id === "" || this.state.pw === "") {
      alert("아이디/비밀번호를 입력해 주십시오");
    } else {
      let checkoutID = axios.get(
        "https://react-911-multiplex.herokuapp.com/member/checkid/" +
          this.state.id
      );
      if (checkoutID.data === false) {
        alert("가입되지 않은 아이디 입니다");
      } else {
        let checklogin = axios
          .post("https://react-911-multiplex.herokuapp.com/member/login", {
            id: this.state.id,
            password: this.state.pw,
          })
          .then((response) => {
            if (response.data.success === 1) {
              location.href = "http://localhost:3001";
            } else {
              alert("비밀번호가 일치하지 않습니다");
              console.log(response);
            }
          });
      }
    }
  };

  render() {
    return (
      <div className="LogIn">
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

        <button onClick={this.PostLogIn}>로그인</button>
      </div>
    );
  }
}
export default LogIn;
