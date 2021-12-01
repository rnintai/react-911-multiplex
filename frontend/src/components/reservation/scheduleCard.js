import React from "react";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

function ScheduleCard({
  date,
  startTime,
  endTime,
  movieName,
  theaterName,
  theaterType,
  availSeat,
  totalSeat,
}) {
  return (
    <div
      className="flex-row"
      style={{
        justifyContent: "space-between",
        borderBottom: "1px solid #d9d9d9",
        padding: "5px 8px",
      }}
    >
      <div className="flex-col" style={{ width: "15%" }}>
        <Font boldness={FontBold.bold}>{date}</Font>
        <Font boldness={FontBold.bold}>{startTime}</Font>
        <Font size={FontSize.sm}>~{endTime}</Font>
      </div>
      <div className="flex-col" style={{ width: "70%" }}>
        <div className="col-1_1">{movieName}</div>
      </div>
      <div className="flex-col" style={{ width: "15%" }}>
        <Font size={FontSize.sm} className="text-right">
          {theaterName}[{theaterType}]
        </Font>
        <Font size={FontSize.sm} className="text-right">
          {availSeat}/{totalSeat}
        </Font>
      </div>
    </div>
  );
}

export default ScheduleCard;
