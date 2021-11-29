/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./Movie_info.css";
import axios from "axios";

class Movie_info extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    //state초기화
    MovieInfo: [],
  };

  getData = async () => {
    //  데이터불러오기
    let MovieInfo = await axios.get(
      "https://react-911-multiplex.herokuapp.com/movies/detail/" +
        this.props.location.state.movie_id
    );
    MovieInfo = MovieInfo.data.movieDetail[0]; //data1 지정
    this.setState({ MovieInfo });
    console.log(MovieInfo);
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        {/* Route에서 Nav를 포함하지 못해서 임시 추가 */}
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
        {/* Info */}
        <section>
          <img className="Movie_img" src={this.state.MovieInfo.poster} />
          <p className="Movie_name"> {this.state.MovieInfo.movie_name} </p>
          <p className="Info">
            장르 : {this.state.MovieInfo.genre} 개봉 :{" "}
            {this.state.MovieInfo.released_at}러닝타임 :{" "}
            {this.state.MovieInfo.running_time}분
          </p>
          <p className="Info">감독: {this.state.MovieInfo.director}</p>
          <p className="Info">출연진 : {this.state.MovieInfo.actors}</p>
        </section>
        <h2>영화 정보</h2>
        <p>{this.state.MovieInfo.synopsis}</p>
      </div>
    );
  }
}
export default Movie_info;
