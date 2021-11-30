import React from "react";
import "./ratingmark.scss";

const RatingMark = ({ rate }) => {
  return (
    <>
      {rate === "전체관람가" && <div className="rating-mark green">전체</div>}
      {rate === "12세이상관람가" && (
        <div className="rating-mark blue">12세</div>
      )}
      {rate === "15세이상관람가" && (
        <div className="rating-mark orange">15세</div>
      )}
      {rate === "청소년관람불가" && <div className="rating-mark red">청불</div>}
    </>
  );
};

export default RatingMark;
