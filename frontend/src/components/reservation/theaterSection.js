import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./selection.scss";

import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";
import RatingMark from "../admin/movie/ratingMark";

const TheaterSection = ({
  scheduleList,
  setSelectedMovieId,
  selectedMultiplexId,
  setSelectedMultiplexId,
  // selectedTheaterId,
  // setSelectedTheaterId,
}) => {
  const [multiplexList, setMultiplexList] = useState([]);
  const [theaterList, setTheaterList] = useState([]);
  useEffect(() => {
    setMultiplexList(filterScheduleListByMultiplexId());
  }, [scheduleList]);
  return (
    <div
      className="row-1_4"
      style={{
        margin: 10,
        borderRight: "1px solid #d9d9d9",
      }}
    >
      <Font size={FontSize.lg}>지점</Font>
      <div className="flex-row row-1/2">
        <div className="flex-col selection-container" style={{ width: "100%" }}>
          {multiplexList.map((elem) => (
            <div
              className={
                selectedMultiplexId === elem.multiplex_id
                  ? "selection-item selected"
                  : "selection-item"
              }
              style={{ padding: "2px" }}
              key={elem.theater_id}
              onClick={() => onClickMultiplex(elem.multiplex_id)}
            >
              <Font size={FontSize.sm} boldness={FontBold.light}>
                {elem.multiplex_name}
              </Font>
            </div>
          ))}
        </div>
        {/* <div
          className="flex-col selection-container row-1_2"
          style={{ margin: "10px 0 0 10px" }}
        >
          {theaterList.map((elem) => (
            <div
              className={
                selectedTheaterId === elem.theater_id
                  ? "selection-item selected"
                  : "selection-item"
              }
              style={{ padding: "0 2px" }}
              key={elem.theater_id}
              onClick={() => onClickTheater(elem.theater_id)}
            >
              <Font size={FontSize.sm} boldness={FontBold.light}>
                {elem.theater_name}
              </Font>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );

  function filterScheduleListByMultiplexId() {
    let tmp = _.uniqBy(scheduleList, "multiplex_id");
    // if (selectedTheaterId !== "") {
    //   tmp = tmp.filter((elem) => elem.theater_id === selectedTheaterId);
    // }
    return tmp;
  }
  // function filterTheaterListByMultiplexId() {
  //   let tmp = scheduleList.filter(
  //     (elem) => elem.multiplex_id === selectedMultiplexId
  //   );
  //   console.log(tmp);
  //   tmp = _.uniqBy(scheduleList, "theater_id");
  //   // if (selectedTheaterId !== "") {
  //   //   tmp = tmp.filter((elem) => elem.theater_id === selectedTheaterId);
  //   // }
  //   return tmp;
  // }

  function onClickMultiplex(id) {
    if (id === selectedMultiplexId) {
      setSelectedMultiplexId("");
    } else {
      setSelectedMultiplexId(id);
    }

    // setTheaterList(filterTheaterListByMultiplexId());
    // setSelectedTheaterId("");
  }
  // function onClickTheater(id) {
  //   setSelectedTheaterId(id);
  // setSelectedTheaterId(filterTheaterListByMultiplexId());
  // }
};

export default TheaterSection;
