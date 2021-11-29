import React from "react";

const RatingMark = ({ rate }) => {
  return (
    <>
      {rate === "전체관람가" && <div>전체</div>}
      {rate === "12세이상관람가" && <div>12</div>}
      {rate === "15세이상관람가" && <div>15</div>}
      {rate === "청소년관람불가" && <div>19</div>}
    </>
  );
};

export default RatingMark;
