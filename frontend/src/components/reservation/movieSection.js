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
  setSelectedMovieId,
  // selectedTheaterId,
}) => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    setMovieList(filterScheduleListByMovieId());
  }, [scheduleList]);
  return (
    <div
      className="row-1_4"
      style={{ margin: 10, borderRight: "1px solid #d9d9d9" }}
    >
      <Font size={FontSize.lg}>영화</Font>
      <div className="flex-col selection-container">
        {movieList.map((elem) => (
          <div
            className={
              selectedMovieId === elem.movie_id
                ? "flex-row selection-item selected"
                : "flex-row selection-item"
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

  function filterScheduleListByMovieId() {
    let tmp = _.uniqBy(scheduleList, "movie_id");
    return tmp;
  }

  function onClickMovie(id) {
    if (id === selectedMovieId) {
      setSelectedMovieId("");
    } else {
      setSelectedMovieId(id);
    }
  }
};

export default MovieSection;
