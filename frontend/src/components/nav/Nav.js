/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./Nav.scss";

class Nav extends Component {
  render() {
    return (
      <header className="nav-wrap">
        <ul className="login_bar">
          <li>
            <a href="/login">로그인</a>
          </li>
          <li>
            <a href="/signup">회원가입</a>
          </li>
        </ul>
        <h1 className="Name">
          <a href="/">911 CINEMA</a>
        </h1>
        <nav>
          <ul className="Nav_bar">
            <li className="Nav">
              영화
              <ul className="Sub_bar">
                <li className="Sub">
                  <a href="/Movies">전체 영화</a>
                </li>
                <li className="Sub">
                  <a href="#">etc</a>
                </li>
              </ul>
            </li>
            <li className="Nav">
              예매
              <ul className="Sub_bar">
                <li className="Sub">
                  <a href="#">시간대 별</a>
                </li>
                <li className="Sub">
                  <a href="#">상영관 별</a>
                </li>
              </ul>
            </li>
            <li className="Nav">
              상영관
              <ul className="Sub_bar">
                <li className="Sub">
                  <a href="#">전체</a>
                </li>
                <li className="Sub">
                  <a href="#">특별관</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Nav;
