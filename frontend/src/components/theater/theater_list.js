import react, { Component } from "react";
import axios from "axios";
import "./theater_list.css";

class theater_list extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  state = {
    theaterList: [],
  };
  getData = async () => {
    const API =
      window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "/api";
    let response = await axios.get(API + "/theater/theaterList.js");
    this.setState(response.data);
    console.log(response.data.theaterList);
  };
  cmponentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div className="theater">
        <div className="title">영화관</div>
        <div className="theater_box">
          <div className="image">
            <img src="" />
          </div>
          <div className="theater_name">
            <p>{}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default theater_list;
