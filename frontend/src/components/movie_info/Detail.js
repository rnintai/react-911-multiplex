/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./Movie_info.css";
import axios from "axios";
import {
  Font,
  FontBold,
  FontColor,
  FontSize,
} from "src/design-system/font/Font";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

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
      API + "/movies/detail/" + this.props.location.state.movie_id
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
      <div className="Detail_box flex-col">
        <img
          className="Movie_img"
          src={this.state.MovieInfo.poster}
          style={{ marginBottom: 10 }}
        />
        <Font
          size={FontSize.xl}
          boldness={FontBold.bold}
          className="Movie_name"
        >
          {this.state.MovieInfo.movie_name}{" "}
        </Font>
        <div className="Info flex-row">
          <Font style={{ marginRight: 10 }}>
            장르 : {this.state.MovieInfo.genre}
          </Font>
          <Font style={{ marginRight: 10 }}>
            개봉 :{" "}
            {this.state.MovieInfo.released_at &&
              this.state.MovieInfo.released_at.split("T")[0]}
          </Font>
          <Font style={{ marginRight: 10 }}>
            러닝타임 : {this.state.MovieInfo.running_time}분
          </Font>
        </div>
        <Font className="Info">감독: {this.state.MovieInfo.director}</Font>
        <Font className="Info">출연진 : {this.state.MovieInfo.actors}</Font>
        <div className="flex-col">
          <Font
            size={FontSize.xl}
            boldness={FontBold.bold}
            className="Movie_name"
            style={{ marginBottom: 8 }}
          >
            영화 정보
          </Font>
          <Font>{this.state.MovieInfo.synopsis}</Font>
        </div>
      </div>
    );
  }
}
export default Movie_info;
