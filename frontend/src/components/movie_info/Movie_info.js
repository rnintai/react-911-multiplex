/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './Movie_info.css';


class Movie_info extends Component {
  render() {
    return (
      <div>
        <section>
          <img className="Movie_img" src="#"/>
          <p className="Movie_name">연령 그림 : 제목 </p>
          <p className="Info">장르 : 개봉 : 러닝타임</p>
          <p className="Info">감독</p>
          <p className="Info">출연진</p>
          <p>예매하기</p>
        </section>
        <h2>영화 정보</h2>
        <p>시놉시스</p>
        <p>???</p>
      </div>
    );
  }
}

export default Movie_info;
