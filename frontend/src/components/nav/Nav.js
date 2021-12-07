/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import "./Nav.scss";
import { Font, FontSize, FontColor } from "src/design-system/font/Font";
import logo from "src/assets/navbar/logo.jpg";
import { Link } from "react-router-dom";

const Nav = ({ userInfo }) => {
  const SignOut = () => {
    location.reload();
    localStorage.clear();
  };
  return (
    <header className="nav-container">
      <section
        className="nav-head"
        style={{ borderBottom: `1px solid ${FontColor.gray50}` }}
      >
        <Link to="/">
          <div className="logo-wrap">
            <img src={logo} alt="" />
          </div>
        </Link>
        <ul className="top-menu">
          {localStorage.getItem("authenticated") === null ? (
            <>
              <li>
                <Link to="/login">
                  <Font tag="button" size={FontSize.sm}>
                    로그인
                  </Font>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <Font tag="button" size={FontSize.sm}>
                    회원가입
                  </Font>
                </Link>
              </li>
            </>
          ) : localStorage.getItem("authenticated") !== null ? (
            <>
              <p>
                {" "}
                {userInfo.isAdmin === 1 && "관리자 "}
                {userInfo.name} 님{" "}
              </p>
              <button onClick={SignOut}>로그아웃</button>
            </>
          ) : null}
        </ul>
      </section>
      <nav className="nav-wrap">
        <div className="nav-menu">
          <Link to="/movies">
            <Font className="nav-link" tag="button">
              영화
            </Font>
          </Link>
        </div>
        <div className="nav-menu">
          <Link to="/reservation">
            <Font className="nav-link" tag="button">
              예매
            </Font>
          </Link>
        </div>
        <div className="nav-menu">
          <Link to="/theater">
            <Font className="nav-link" tag="button">
              영화관
            </Font>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
