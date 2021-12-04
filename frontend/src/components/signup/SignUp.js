/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-constructor */
import axios from "axios";
import React, { Component } from "react";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      pw: "",
      email: "",
      gender: "",
      BTday: "",
      phone: "",
      address: "",
      CKemail: "",
      CKid: "",
      CKphone: "",
    };
  }
  //input값 가져오기
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
  appChangeName = (name) => {
    this.setState({
      [name.target.name]: name.target.value,
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
  appChangeGender = (gender) => {
    this.setState({
      [gender.target.name]: gender.target.value,
    });
  };
  appChangeBTdat = (BTday) => {
    this.setState({
      [BTday.target.name]: BTday.target.value,
    });
  };
  appChangeAdr = (address) => {
    this.setState({
      [address.target.name]: address.target.value,
    });
  };
  //중복확인
  checkId = async (id) => {
    this.setState({
      [id.target.name]: id.target.value,
    });
    if (this.state.id === "") {
      alert("아이디를 입력해 주세요.");
    } else {
      let checkoutID = await axios.get(
        "https://react-911-multiplex.herokuapp.com/member/checkid/" +
          this.state.id
      );
      if (checkoutID.data === true) {
        alert("사용가능한 아이디 입니다.");
        this.state.CKid = this.state.id;
      } else {
        alert("이미 사용중인 아이디 입니다.");
        var el = document.getElementsByClassName("SignUp_id");
        for (var i = 0; i < el.length; i++) {
          el[i].value = "";
        }
      }
    }
  };
  checkEmail = async (email) => {
    this.setState({
      [email.target.name]: email.target.value,
    });
    if (this.state.email === "") {
      alert("이메일을 입력해 주세요");
    } else {
      let checkoutEmail = await axios.get(
        "https://react-911-multiplex.herokuapp.com/member/checkemail/" +
          this.state.email
      );
      if (checkoutEmail.data === true) {
        alert("사용가능한 E-mail 입니다.");
        this.state.CKemail = this.state.email;
      } else {
        alert("이미 사용중인 E-mail 입니다.");
        var el = document.getElementsByClassName("SignUp_email");
        for (var i = 0; i < el.length; i++) {
          el[i].value = "";
        }
      }
    }
    console.log(`${this.state.email}`);
  };
  checkPhone = async (phone) => {
    this.setState({
      [phone.target.name]: phone.target.value,
    });
    if (this.state.phone === "") {
      alert("전화번호를 입력해 주세요");
    } else {
      let checkoutPhone = await axios.get(
        "https://react-911-multiplex.herokuapp.com/member/checkphone/" +
          this.state.phone
      );
      if (checkoutPhone.data === true) {
        alert("가입가능한 전화번호 입니다.");
        this.state.CKphone = this.state.phone;
      } else {
        alert("이미 사용중인 전화번호 입니다.");
        var el = document.getElementsByClassName("SignUp_phone");
        for (var i = 0; i < el.length; i++) {
          el[i].value = "";
        }
      }
    }
    console.log(`${this.state.phone}`);
  };
  // 이메일 형태 확인하기
  PostSignup = (
    name,
    id,
    pw,
    email,
    phone,
    gender,
    address,
    CKid,
    CKemail,
    CKphone
  ) => {
    if (
      this.state.name === "" ||
      this.state.id === "" ||
      this.state.pw === "" ||
      this.state.email === "" ||
      this.state.BTday === "" ||
      this.state.phone === "" ||
      this.state.gender === ""
    )
      alert("빈칸을 채워 주십시오.");
    else {
      if (
        this.state.CKid === "" ||
        this.state.CKemail === "" ||
        this.state.CKphone === ""
      ) {
        alert("중복확인해주세요.");
      } else {
        alert(
          "아이디 : " +
            this.state.CKid +
            " 이메일 : " +
            this.state.CKemail +
            " 전화번호 : " +
            this.state.CKphone
        );
        axios
          .post(API + "member/signup", {
            userId: this.state.CKid,
            password: this.state.pw,
            name: this.state.name,
            email: this.state.CKemail,
            birthday: this.state.BTday,
            phoneNum: this.state.CKphone,
            gender: this.state.gender,
            address: this.state.address,
          })
          .then((response) => {
            location.href = "https://911-cinema.netlify.app";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  render() {
    return (
      <div className="SignUp">
        <input
          placeholder="이름"
          type="text"
          name="name"
          onChange={this.appChangeName}
        ></input>
        <input
          className="SignUp_id"
          placeholder="ID"
          type="text"
          name="id"
          onChange={this.appChangeId}
        ></input>
        <button onClick={this.checkId}>중복확인</button>
        <input
          placeholder="비밀번호"
          type="password"
          name="pw"
          onChange={this.appChangePw}
        ></input>
        <input
          className="SignUp_email"
          placeholder="E-mail"
          type="email"
          name="email"
          onChange={this.appChangeEmail}
        ></input>
        <button onClick={this.checkEmail}>중복확인</button>
        <select
          placeholder="성별"
          name="gender"
          onChange={this.appChangeGender}
        >
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
        <input
          placeholder="생년월일"
          type="date"
          name="BTday"
          onChange={this.appChangeBTdat}
        ></input>
        <input
          className="SignUp_phone"
          placeholder="전화번호"
          type="tel"
          name="phone"
          maxlength="11"
          onChange={this.appChangePhone}
        ></input>
        <button onClick={this.checkPhone}>중복확인</button>
        <input
          placeholder="주소입력(선택)"
          name="address"
          onChange={this.appChangeAdr}
        ></input>

        <button onClick={this.PostSignup}>회원가입</button>
      </div>
    );
  }
}

export default SignUp;
