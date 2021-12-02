/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import axios from "axios";
import "./Card.css";
import { Link } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    //state초기화
    boxOfficeList: [],
  };
  getData = async () => {
    let response = await axios.get(
      "https://react-911-multiplex.herokuapp.com/movies/boxoffice"
    );
    this.setState(response.data);
    console.log(response.data.boxOfficeList);
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="Card_View">
        <ul className="Card_List">
          {this.state.boxOfficeList.map((element) => (
            <li>
              <div className="Movie">
                <img
                  src={
                    element.poster === ""
                      ? "/images/uploads/poster/default.jpg"
                      : element.poster
                  }
                />
                <ul className="Movie_Sub">
                  <li>
                    <a href="/404">예매하기</a>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/movies/detail/${element.movie_id}`,
                        state: {
                          movie_id: element.movie_id,
                        },
                      }}
                    >
                      상세정보
                    </Link>
                  </li>
                </ul>
              </div>
              <p>{element.movie_name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Card;
