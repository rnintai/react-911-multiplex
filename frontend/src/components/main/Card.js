/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import axios from "axios";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    //state초기화
    data1: [],
    data2: [],
    data3: [],
    data4: [],
    data5: [],
  };
  getData = async () => {
    //  데이터불러오기
    let data1 = await axios.get(
      "https://react-911-multiplex.herokuapp.com/movies/boxoffice"
    );
    data1 = data1.data.boxOfficeList[0]; //data1 지정
    let data2 = await axios.get(
      "https://react-911-multiplex.herokuapp.com/movies/boxoffice"
    );
    data2 = data2.data.boxOfficeList[1]; //data2 지정
    let data3 = await axios.get(
      "https://react-911-multiplex.herokuapp.com/movies/boxoffice"
    );
    data3 = data3.data.boxOfficeList[2]; //data3 지정
    let data4 = await axios.get(
      "https://react-911-multiplex.herokuapp.com/movies/boxoffice"
    );
    data4 = data4.data.boxOfficeList[3]; //data4 지정
    let data5 = await axios.get(
      "https://react-911-multiplex.herokuapp.com/movies/boxoffice"
    );
    data5 = data5.data.boxOfficeList[4]; //data5 지정

    this.setState({ data1 });
    this.setState({ data2 });
    this.setState({ data3 });
    this.setState({ data4 });
    this.setState({ data5 });
    console.log(data1);
    console.log(data2);
    console.log(data3);
    console.log(data4);
    console.log(data5);
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="Card_View">
        <ul className="Card_List">
          <li>
            <div className="Movie">
              <img src={this.state.data1.poster} />
              <ul className="Movie_Sub">
                <li>
                  <a href="/404">예매하기</a>
                </li>
                <li>
                  <a href="/20218256">상세정보</a>
                </li>
              </ul>
            </div>
            <p>
              {this.state.data1.movie_name /*data1 안에 movie_name불러오기*/}
            </p>
            <a>
              누적 예약 :{" "}
              {this.state.data1.reserved_count /*누적 예약수 불러왔음 */}{" "}
            </a>
          </li>
          <li>
            <div className="Movie">
              <img
                src={
                  "https://react-911-multiplex.herokuapp.com" +
                  this.state.data2.poster
                }
              />
              <ul className="Movie_Sub">
                <li>
                  <a href="/404">예매하기</a>
                </li>
                <li>
                  <a href="/20210087">상세정보</a>
                </li>
              </ul>
            </div>
            <p>{this.state.data2.movie_name}</p>
            <a>
              누적 예약 :{" "}
              {this.state.data2.reserved_count /*누적 예약수 불러왔음 */}
            </a>
          </li>
          <li>
            <div className="Movie">
              <img src={this.state.data3.poster} />
              <ul className="Movie_Sub">
                <li>
                  <a href="/404">예매하기</a>
                </li>
                <li>
                  <a href="/20218052">상세정보</a>
                </li>
              </ul>
            </div>
            <p>{this.state.data3.movie_name}</p>
            <a>
              누적 예약 :{" "}
              {this.state.data3.reserved_count /*누적 예약수 불러왔음 */}
            </a>
          </li>
          <li>
            <div className="Movie">
              <img src={this.state.data4.poster} />
              <ul className="Movie_Sub">
                <li>
                  <a href="/404">예매하기</a>
                </li>
                <li>
                  <a href="/20210865">상세정보</a>
                </li>
              </ul>
            </div>
            <p>{this.state.data4.movie_name}</p>
            <a>
              누적 예약 :{" "}
              {this.state.data4.reserved_count /*누적 예약수 불러왔음 */}
            </a>
          </li>
          <li>
            <div className="Movie">
              <img src={this.state.data5.poster} />
              <ul className="Movie_Sub">
                <li>
                  <a href="/404">예매하기</a>
                </li>
                <li>
                  <a href="/20210683">상세정보</a>
                </li>
              </ul>
            </div>
            <p>{this.state.data5.movie_name}</p>
            <a>
              누적 예약 :{" "}
              {this.state.data5.reserved_count /*누적 예약수 불러왔음 */}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Card;
