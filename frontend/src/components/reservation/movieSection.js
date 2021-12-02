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

const MovieSection = ({
  scheduleList,
  selectedMovieId,
  selectedMultiplexId,
  setSelectedMovieId,
  setSelectedMultiplexId,
  setSelectedScheduleId,
  filteredScheduleList,
}) => {
  const [movieList, setMovieList] = useState([]);
  // const [availableMovieList, setAvailableMovieList] = useState([]);

  useEffect(() => {
    setMovieList(filterScheduleListByMovieId());
  }, [scheduleList]);

  // useEffect(() => {
  // setAvailableMovieList(
  //   filterAvailableScheduleListByMultiplexId(selectedMultiplexId)
  // );
  // }, [filteredScheduleList]);
  return (
    <div
      className="row-1_4"
      style={{ padding: 10, borderRight: "1px solid #d9d9d9", height: 310 }}
    >
      <Font size={FontSize.lg}>영화</Font>
      <div className="flex-col selection-container">
        {movieList.map((elem) => (
          <div
            className={
              "flex-row selection-item" +
              selectedClass(elem) +
              availableClass(elem)
            }
            key={elem.movie_id}
            onClick={() => onClickMovie(elem.movie_id)}
          >
            <RatingMark rate={elem.age_limit}></RatingMark>
            <Font boldness={FontBold.light}>{elem.movie_name}</Font>
          </div>
        ))}
      </div>
    </div>
  );

  function selectedClass(parent) {
    if (selectedMovieId === parent.movie_id) {
      return " selected";
    } else {
      return "";
    }
  }

  function availableClass(parent) {
    let result = filterAvailableScheduleListByMultiplexId(
      parent.multiplex_id
    ).filter((elem) => elem.movie_id === parent.movie_id);

    if (result.length !== 0) {
      return "";
    } else {
      return " unavailable";
    }
  }

  function filterScheduleListByMovieId() {
    let tmp = _.uniqBy(scheduleList, "movie_id");
    return tmp;
  }

  function filterAvailableScheduleListByMultiplexId(id) {
    let tmp = [];
    if (id !== "") {
      tmp = _.uniqBy(filteredScheduleList, "movie_id");
    } else {
      tmp = movieList;
    }
    return tmp;
  }

  function onClickMovie(id) {
    if (id === selectedMovieId) {
      setSelectedMovieId("");
    } else {
      setSelectedMovieId(id);
    }
    // setSelectedMultiplexId("");
    setSelectedScheduleId("");
  }
};

export default MovieSection;
