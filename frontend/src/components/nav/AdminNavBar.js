import React, { Component, useEffect } from "react";
import "./adminnavbar.scss";
import { Font, FontSize, FontColor } from "src/design-system/font/Font";
import logo from "src/assets/navbar/logo.jpg";
import { Link } from "react-router-dom";

const AdminNavBar = ({ history, isAdmin }) => {
  function checkAdmin() {
    if (isAdmin !== "1") {
      alert("관리 권한이 없습니다.");
      // history.push("/");
    }
  }

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <header className="admin-nav-container">
      <section
        className="nav-head"
        style={{ borderBottom: `1px solid ${FontColor.gray50}` }}
      >
        <Link to="/admin">
          <div className="logo-wrap">
            <img src={logo} alt="" />
          </div>
        </Link>
        <ul className="top-menu">
          {/* <li>
            <Font tag="button" size={FontSize.sm}>
              로그인
            </Font>
          </li> */}
        </ul>
      </section>
      <nav className="admin-nav-wrap">
        <div className="nav-menu">
          <Font className="nav-link">영화관리</Font>
          <ul className="sub-list">
            <li className="sub-item">
              <Link to="/admin/movie/info">
                <Font className="sub-link" color={FontColor.gray75}>
                  영화정보
                </Font>
              </Link>
            </li>
            <li className="sub-item">
              <Link to="/admin/movie/schedule">
                <Font className="sub-link" color={FontColor.gray75}>
                  상영스케줄
                </Font>
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-menu">
          <Link to="/admin/multiplex">
            <Font className="nav-link">지점관리</Font>
          </Link>
        </div>
        <div className="nav-menu">
          <Link to="/admin/employee">
            <Font className="nav-link">직원관리</Font>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavBar;
