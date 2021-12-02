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
        padding: "10px 8px",
      }}
    >
      <div className="flex-col" style={{ width: "15%" }}>
        <Font boldness={FontBold.bold} style={{ marginBottom: 5 }}>
          {date}
        </Font>
        <Font
          size={FontSize.sm}
          boldness={FontBold.bold}
          color={FontColor.gray75}
        >
          {startTime}~{endTime}
        </Font>
      </div>
      <div className="flex-col" style={{ width: "60%" }}>
        <Font className="col-1_1">{movieName}</Font>
      </div>
      <div className="flex-col" style={{ width: "15%" }}>
        <Font
          size={FontSize.sm}
          className="text-right"
          style={{ marginBottom: 5 }}
        >
          {theaterName} [{theaterType}]
        </Font>
        <Font size={FontSize.sm} className="text-right">
          {availSeat}/{totalSeat}
        </Font>
      </div>
    </div>
  );
}

export default ScheduleCard;
