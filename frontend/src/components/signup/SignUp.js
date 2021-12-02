/* eslint-disable no-useless-constructor */
import axios from "axios";
import React, { Component } from "react";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", //아이디를 저장하고 있을 state
      email: "",
      phone: "",
    };
  }
  //input값 가져오기
  appChangeId = (id) => {
    this.setState({
      [id.target.name]: id.target.value,
    });
  };
  appChangeEmail = (email) => {
    this.setState({
      [email.target.name]: email.target.value,
    });
  };
  appChangePhone = (phone) => {
    this.setState({
      [phone.target.name]: phone.target.value,
    });
  };
  // appChanegeSignInfo = (
  //   password,
  //   name,
  //   email,
  //   birthday,
  //   phone_number,
  //   gender,
  //   signin_date,
  //   address
  // ) => {
  //   this.setState({
  //     [name.target.name]: name.target.value,
  //     [id.target.name]: id.target.value,
  //     [password.target.name]: password.target.value,
  //     [birthday.target.name]: birthday.target.value,
  //     [email.target.name]: email.target.value,
  //     [phone_number.target.name]: phone_number.target.value,
  //     [gender.target.name]: gender.target.value,
  //     [signin_date.target.name]: address.target.value,
  //   });
  // };
  //중복확인
  checkId = async (id) => {
    this.setState({
      [id.target.name]: id.target.value,
    });
    let checkoutID = await axios.get(
      "https://react-911-multiplex.herokuapp.com/member/checkid/" +
        this.state.id
    );
    console.log(`${this.state.id}`);
    if (checkoutID.data === true) {
      alert("사용가능한 아이디 입니다.");
    } else {
      alert("이미 사용중인 아이디 입니다.");
      id.text = "";
    }
  };
  checkEmail = async (email) => {
    this.setState({
      [email.target.name]: email.target.value,
    });
    let checkoutEmail = await axios.get(
      "https://react-911-multiplex.herokuapp.com/member/checkemail/" +
        this.state.email
    );
    console.log(`${this.state.email}`);
    if (checkoutEmail.data === true) {
      alert("사용가능한 E-mail 입니다.");
    } else {
      alert("이미 사용중인 E-mail 입니다.");
    }
  };
  checkPhone = async (phone) => {
    this.setState({
      [phone.target.name]: phone.target.value,
    });
    let checkoutPhone = await axios.get(
      "https://react-911-multiplex.herokuapp.com/member/checkphone/" +
        this.state.phone
    );
    console.log(`${this.state.email}`);
    if (checkoutPhone.data === true) {
      alert("가입가능한 전화번호 입니다.");
    } else {
      alert("이미 사용중인 전화번호 입니다.");
    }
  };
  // checkSingUp() {
  //   axios.post("https://react-911-multiplex.herokuapp.com/member/signup", {
  //     password: ,
  //     name: ,
  //     email: ,
  //     birthday: ,
  //     phone_number: ,
  //     signin_date: ,
  //     address: ,
  //   });
  // }

  render() {
    return (
      <div className="SignUp">
        <input placeholder="이름" type="text" name="id"></input>
        <input
          placeholder="ID"
          type="text"
          name="id"
          onChange={this.appChangeId}
        ></input>
        <button onClick={this.checkId}>중복확인</button>
        <input placeholder="비밀번호" type="password" name="pw"></input>
        <input
          placeholder="E-mail 만약이메일형태가아니면?"
          type="email"
          name="email"
          onChange={this.appChangeEmail}
        ></input>
        <button onClick={this.checkEmail}>중복확인</button>
        <input placeholder="생년" type="text" name="BTdayYYYY"></input>
        <input placeholder="월" type="text" name="BTdayMM"></input>
        <input placeholder="일" type="text" name="BTdayDD"></input>
        <input
          placeholder="전화번호 '-'빼고"
          type="text"
          name="phone"
          onChange={this.appChangePhone}
        ></input>
        <button onClick={this.checkPhone}>중복확인</button>
        <input placeholder="계정생성날짜 이건 input말고"></input>
        <input placeholder="address 고민"></input>

        <button>회원가입</button>
      </div>
    );
  }
}

export default SignUp;
