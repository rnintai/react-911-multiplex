/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import './SignUp.css'

class SingUp extends Component{
    render() {
      return (
        <div>
          <p>이름 입력받는 곳 </p>
          <p>아이디 입력받는 곳 만들기</p>
          <p>비밀번호 입력받는 곳 만들기</p>
          <button>완료</button>{/*  아이디가 겹치는지 확인 */}
        </div>
      );
    }
  }

export default SingUp;
