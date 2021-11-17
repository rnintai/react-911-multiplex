/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import axios from 'axios';
import './Card.css';



class Card extends Component {
  constructor(props){         
    super(props);     
    console.log("제발");
  }
  state = {         //state초기화
    data1 : [],
    data2 : [],
  }
  getData = async() =>{       //  데이터불러오기
    let data1 = await axios.get('https://fa771d4d-174b-46bc-8ee8-246d976ee361.mock.pstmn.io/boxoffice');
    data1 = data1.data.boxOfficeList[0] //data1 지정
    let data2 = await axios.get('https://fa771d4d-174b-46bc-8ee8-246d976ee361.mock.pstmn.io/boxoffice');
    data2 = data2.data.boxOfficeList[1] //data2 지정

    this.setState({data1});     
    this.setState({data2});
    console.log(data1);
    console.log(data2);
  };

  componentDidMount(){
    this.getData();
  } 
  render() {
    return ( 
      <div className="Card_View"> 
        <ul className="Card_List">
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul className="Movie_Sub">
                <li><a href="/404">예매하기</a></li>
                <li><a href="/movie_info">상세정보</a></li>
              </ul>
            </div>
            <p>{this.state.data1.movie_name /*data1 안에 movie_name불러오기*/}</p> 
            <a>누적 예약 : {this.state.data1.reserved_count/*누적 예약수 불러왔음 */} </a>   
            <a>평점 : </a>
          </li>
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul className="Movie_Sub">
                <li><a href="/404">예매하기</a></li>
                <li><a href="/movie_info">상세정보</a></li>
              </ul>
            </div>
            <p>{this.state.data2.movie_name/*임의로 만든 data2*/}</p>
            <a>예매율</a>
            <a>평점</a>
          </li>
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul className="Movie_Sub">
                <li><a href="/404">예매하기</a></li>
                <li><a href="/movie_info">상세정보</a></li>
              </ul>
            </div>
            <p>제목3</p>
            <a>예매율</a>
            <a>평점</a>
          </li>
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul className="Movie_Sub">
                <li><a href="/404">예매하기</a></li>
                <li><a href="/movie_info">상세정보</a></li>
              </ul>
            </div>
            <p>제목4</p>
            <a>예매율</a>
            <a>평점</a>
          </li>
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul className="Movie_Sub">
                <li><a href="/404">예매하기</a></li>
                <li><a href="/movie_info">상세정보</a></li>
              </ul>
            </div>
            <p>제목5</p>
            <a>예매율</a>
            <a>평점</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
