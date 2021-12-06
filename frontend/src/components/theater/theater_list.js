import react, { Component } from "react";
import axios from "axios";
import "./theater_list.css";
import { Link } from "react-router-dom";

class theater_list extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  state = {
    multiplexList: [],
  };
  getData = async () => {
    const API =
      window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "/api";
    let response = await axios.get(API + "/multiplex/multiplexList.js");
    this.setState(response.data);
    console.log(response.data.multiplexList);
  };
  cmponentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="theater">
        <div className="title">
          <h2>영화관</h2>
        </div>
        <div className="theater_view">
          <div className="theater_box">
            <div className="image">
              <img src="" />
            </div>
            <div className="theater_name">
              <p>안산점</p>
            </div>
          </div>
          <div className="theater_box">
            <div className="image">
              <img src="" />
            </div>
            <div className="theater_name">
              <p>수원점</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default theater_list;
