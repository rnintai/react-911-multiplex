/* eslint-disable no-useless-constructor */
//전체 영화
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Movie_list.css";

import {
  Font,
  FontBold,
  FontColor,
  FontSize,
} from "src/design-system/font/Font";
import { Button, BgColor } from "src/design-system/button/Button";

class Movie_list extends Component {
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
      <div className="Movie_list">
        <div className="Title">
          <h2>전체 영화</h2>
        </div>
        <div className="Moviecard_View">
          <div className="Moviecard_List">
            {this.state.boxOfficeList.map((element) => (
              <div className="Movie_box">
                <div className="Movie">
                  <img
                    src={
                      element.poster === ""
                        ? "/images/uploads/poster/default.jpg"
                        : element.poster
                    }
                    alt={element.movie_id + "-poster"}
                  />
                  <ul className="Moviecard_Sub">
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
                        background={BgColor.tp}
                        boldness={FontBold.bold}
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
                          boldness={FontBold.bold}
                          background={BgColor.tp}
                          className="movie-btn"
                        >
                          상세정보
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="Movie_name">{element.movie_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Movie_list;
