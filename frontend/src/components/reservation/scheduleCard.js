import React from "react";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

function ScheduleCard({
  // date,
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
        padding: "10px 8px",
      }}
    >
      <div className="flex-col" style={{ width: "15%" }}>
        {/* <Font boldness={FontBold.bold} style={{ marginBottom: 5 }}>
          {date}
        </Font> */}
        {/* <div> */}
        <Font color={FontColor.black}>{startTime}</Font>
        <Font size={FontSize.xs} color={FontColor.gray75}>
          ~{endTime}
        </Font>
        {/* </div> */}
      </div>
      <div className="flex-col" style={{ width: "60%" }}>
        <Font className="col-1_1">{movieName}</Font>
        <Font
          size={FontSize.xs}
          boldness={FontBold.bold}
          color={FontColor.gray75}
          className="col-1_1"
        >
          {theaterType}
        </Font>
      </div>
      <div className="flex-col" style={{ width: "15%" }}>
        <Font
          size={FontSize.xs}
          className="text-right"
          style={{ marginBottom: 5 }}
        >
          {theaterName}
        </Font>
        <Font size={FontSize.xs} className="text-right">
          {availSeat}/{totalSeat}
        </Font>
      </div>
    </div>
  );
}

export default ScheduleCard;
