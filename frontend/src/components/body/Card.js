import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="Card_View"> 
        <ul className="Card_List">
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul>
                <li>예매하기</li>
                <li>상세정보</li>
              </ul>
            </div>
            <p>제목1</p>
            <a>예매율</a>
            <a>평점</a>
          </li>
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul>
                <li>예매하기</li>
                <li>상세정보</li>
              </ul>
            </div>
            <p>제목2</p>
            <a>예매율</a>
            <a>평점</a>
          </li>
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul>
                <li>예매하기</li>
                <li>상세정보</li>
              </ul>
            </div>
            <p>제목3</p>
            <a>예매율</a>
            <a>평점</a>
          </li>
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul>
                <li>예매하기</li>
                <li>상세정보</li>
              </ul>
            </div>
            <p>제목4</p>
            <a>예매율</a>
            <a>평점</a>
          </li>
          <li>
            <div className="Movie">
              <img src="#"/>
              <ul>
                <li>예매하기</li>
                <li>상세정보</li>
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
