// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { Component } from "react";
// import "./Nav.scss";

// class Nav extends Component {
//   render() {
//     return (
//       <header className="nav-wrap">
//         <ul className="login_bar">
//           <li>
//             <a href="/login">로그인</a>
//           </li>
//           <li>
//             <a href="/signup">회원가입</a>
//           </li>
//         </ul>
//         <h1 className="Name">
//           <a href="/">911 CINEMA</a>
//         </h1>
//         <nav>
//           <ul className="Nav_bar">
//             <li className="Nav">
//               영화
//               <ul className="Sub_bar">
//                 <li className="Sub">
//                   <a href="/Movies">전체 영화</a>
//                 </li>
//               </ul>
//             </li>
//             <li className="Nav">예매</li>
//             <li className="Nav">
//               상영관
//               <ul className="Sub_bar">
//                 <li className="Sub">
//                   <a href="#">전체</a>
//                 </li>
//                 <li className="Sub">
//                   <a href="#">특별관</a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </nav>
//       </header>
//     );
//   }
// }

// export default Nav;

import React, { Component } from "react";
import "./nav.scss";
import { Font, FontSize, FontColor } from "src/design-system/font/Font";
import logo from "src/assets/navbar/logo.jpg";
import { Link } from "react-router-dom";

const Nav = () => {
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
