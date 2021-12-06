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
                    <Link
                      to={{
                        pathname: `/reservation?movieid=${element.movie_id}`,
                        state: {
                          movie_id: element.movie_id,
                        },
                      }}
                    >
                      예매하기
                    </Link>
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
              <p>{element.movie_name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Card;
