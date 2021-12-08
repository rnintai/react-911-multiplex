import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "./adminnavbar.scss";
import { Font, FontSize, FontColor } from "src/design-system/font/Font";
import logo from "src/assets/navbar/logo.jpg";
import { Link } from "react-router-dom";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

const AdminNavBar = ({ history, userId }) => {
  const [isAdmin, setIsAdmin] = useState(-1);

  async function checkAdmin() {
    try {
      let response = await axios.get(API + "/member/info/" + userId);
      setIsAdmin(response.data.data.isAdmin);
    } catch (err) {
      console.log(err);
      setIsAdmin(0);
    }
    if (isAdmin === 0 || isAdmin === undefined || isAdmin === null) {
      alert("관리 권한이 없습니다.");
      // history.push("/");
    }
  }

  useEffect(() => {
    checkAdmin();
  }, [isAdmin]);

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
          <li>
            <Link to="/">
              <Font tag="button" size={FontSize.sm}>
                홈으로
              </Font>
            </Link>
          </li>
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
