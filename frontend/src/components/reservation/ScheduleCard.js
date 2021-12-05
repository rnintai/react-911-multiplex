import React from "react";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

function ScheduleCard({
  // date,
  scheduleId,
  startTime,
  endTime,
  movieName,
  theaterName,
  theaterType,
  availSeat,
  totalSeat,
  selectedScheduleId,
  setSelectedScheduleId,
}) {
  return (
    <div
      className={scheduleCardClass(scheduleId)}
      style={{
        justifyContent: "space-between",
        borderBottom: "1px solid #d9d9d9",
        padding: "10px 8px",
      }}
      onClick={() => onClickScheduleCard(scheduleId)}
    >
      <div className="flex-col" style={{ width: "15%" }}>
        <Font color={FontColor.black}>{startTime}</Font>
        <Font size={FontSize.xs} color={FontColor.gray75}>
          ~{endTime}
        </Font>
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
        <div className="flex-row" style={{ justifyContent: "flex-end" }}>
          <Font size={FontSize.xs} boldness={FontBold.bold}>
            {availSeat}
          </Font>
          <Font size={FontSize.xs} boldness={FontBold.light}>
            /
          </Font>
          <Font size={FontSize.xs} boldness={FontBold.light}>
            {totalSeat}
          </Font>
        </div>
      </div>
    </div>
  );
  // 카드 클릭 시 호출
  function onClickScheduleCard(id) {
    setSelectedScheduleId(id);
  }

  function scheduleCardClass(id) {
    if (id === selectedScheduleId) {
      return "schedule-card flex-row selected";
    } else {
      return "schedule-card flex-row";
    }
  }
}

export default ScheduleCard;
