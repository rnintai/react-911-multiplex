import React from "react";
import axios from "axios";
import _ from "lodash";

import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";
import RatingMark from "../admin/movie/ratingMark";

const MovieSection = ({ scheduleList }) => {
  console.log(filterScheduleList());
  return (
    <div className="row-1_3" style={{ padding: 10 }}>
      <Font size={FontSize.lg}>영화</Font>
    </div>
  );

  function filterScheduleList() {
    return _.uniqBy(scheduleList, "movie_id");
  }
};

export default MovieSection;
