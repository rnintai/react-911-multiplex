//전체 영화
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Movie_list.css";

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
                  />
                  <ul className="Moviecard_Sub">
                    <li>
                      <a href="/404">예매하기</a>
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
                        상세정보
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
