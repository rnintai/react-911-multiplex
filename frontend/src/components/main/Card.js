/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import axios from "axios";
import "./Card.css";
import { Link } from "react-router-dom";

import { Font, FontColor, FontSize } from "src/design-system/font/Font";
import { Button, BgColor } from "src/design-system/button/Button";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

class Card extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    //state초기화
    boxOfficeList: [],
  };
  getData = async () => {
    let response = await axios.get(API + "/movies/boxoffice");
    let temp = response.data.boxOfficeList.slice(0, 5);
    this.setState({ boxOfficeList: temp });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="Card_View">
        <ul className="Card_List">
          {this.state.boxOfficeList.map((element) => (
            <li key={element.movie_id.toString()}>
              <div className="Movie">
                <img src={element.poster} />
                <ul className="Movie_Sub">
                  <li>
                    {/* <Link
                      to={{
                        pathname: `/reservation?movieId=${element.movie_id}`,
                        state: {
                          movie_id: element.movie_id,
                        },
                      }}
                    >
                      예매하기
                    </Link> */}
                    <Button
                      color={FontColor.white}
                      background={BgColor.tp}
                      className="movie-btn"
                      onClick={() =>
                        this.props.history.push({
                          pathname: "/reservation",
                          search: `?movieId=${element.movie_id}`,
                        })
                      }
                    >
                      예매하기
                    </Button>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/Movies/Detail/${element.movie_id}`,
                        state: {
                          movie_id: element.movie_id,
                        },
                      }}
                    >
                      <Button
                        color={FontColor.white}
                        background={BgColor.tp}
                        className="movie-btn"
                      >
                        상세정보
                      </Button>
                    </Link>
                  </li>
                </ul>
              </div>
              <Font color={FontColor.white}>{element.movie_name}</Font>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Card;
