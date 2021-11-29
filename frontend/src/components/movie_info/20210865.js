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
      "https://react-911-multiplex.herokuapp.com/movies/detail/20210865"
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
