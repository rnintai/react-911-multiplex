import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./selection.scss";

import ScheduleCard from "./scheduleCard";

import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

const ScheduleSection = ({
  scheduleList,
  selectedMovieId,
  selectedMultiplexId,
  filteredScheduleList,
  setFilteredScheduleList,
}) => {
  const [curDate, setcurDate] = useState(ISOtoYMD(new Date().toISOString()));
  const [curWeekList, setCurWeekList] = useState([]);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    setFilteredScheduleList(scheduleList);
    setDateList(getDatesStartToLast(yearStartDate(), yearEndDate()));
    setCurWeekList(
      getDatesStartToLast(weekStartDate(curDate), weekEndDate(curDate))
    );
  }, [scheduleList]);
  // 영화 및 지점 선택 시 호출
  useEffect(() => {
    filterScheduleListWithSelection(selectedMovieId, selectedMultiplexId);
  }, [selectedMovieId, selectedMultiplexId]);

  return (
    <div className="row-1_2">
      <div className="flex-col">
        {/* <Font style={{ marginLeft: 10 }}>
          {dateToYear(curDate) + "/" + dateToMonth(curDate)}
        </Font> */}
        <div
          className="flex-row justify-cen"
          style={{ width: "100%", position: "relative" }}
        >
          <div className="date-btn">
            <i class="fas fa-caret-left"></i>
          </div>
          {curWeekList.map((elem) => (
            <div
              className={
                elem === curDate
                  ? "flex-row justify-cen date-selector selected"
                  : "flex-row justify-cen date-selector"
              }
              style={{ width: 40, height: 40, position: "relative" }}
            >
              {dateToDay(elem) === "01" && (
                <div className="flex-col" style={{ fontSize: 14 }}>
                  <Font
                    size={FontSize.xs}
                    boldness={FontBold.bold}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 7,
                    }}
                  >
                    {dateToYear(elem).substr(2, 2) + "/" + dateToMonth(elem)}
                  </Font>
                  {dateToDay(elem)}
                </div>
              )}
              {dateToDay(elem) !== "01" && (
                <Font color={FontColor.gray75}>{dateToDay(elem)}</Font>
              )}
            </div>
          ))}
          <div className="date-btn">
            <i class="fas fa-caret-right"></i>
          </div>
        </div>
      </div>
      <div className="flex-row row-1/2">
        <div className="flex-col selection-container" style={{ width: "100%" }}>
          {selectedMovieId !== "" &&
            selectedMultiplexId !== "" &&
            filteredScheduleList.map((elem) => (
              <ScheduleCard
                date={parseDateOnly(elem.movie_schedule_start)}
                startTime={dateToTime(elem.movie_schedule_start)}
                endTime={dateToTime(elem.movie_schedule_end)}
                movieName={elem.movie_name}
                theaterName={elem.theater_name}
                theaterType={elem.theater_type}
                availSeat="140"
                totalSeat="160"
                key={elem.movie_schedule_id}
              ></ScheduleCard>
            ))}
          {(selectedMovieId === "" || selectedMultiplexId === "") && (
            <Font color={FontColor.gray50} style={{ marginLeft: 10 }}>
              영화 및 지점을 선택해주세요.
            </Font>
          )}
        </div>
      </div>
    </div>
  );

  function filterScheduleListWithSelection(movieId, multiplexId) {
    let scheduleListCpy = scheduleList;
    if (movieId !== "" && multiplexId === "") {
      // 영화 선택됨
      scheduleListCpy = scheduleListCpy.filter(
        (elem) => elem.movie_id === movieId
      );
    } else if (movieId === "" && multiplexId !== "") {
      // 지점 선택
      scheduleListCpy = scheduleListCpy.filter(
        (elem) => elem.multiplex_id === multiplexId
      );
    } else if (movieId !== "" && multiplexId !== "") {
      // 둘다 선택됨
      scheduleListCpy = scheduleListCpy.filter(
        (elem) => elem.movie_id === movieId && elem.multiplex_id === multiplexId
      );
    }
    setFilteredScheduleList(scheduleListCpy);
  }

  function parseDateOnly(orgTime) {
    let dateStr = new Date(orgTime);
    let month =
      dateStr.getMonth() < 10 ? "0" + dateStr.getMonth() : dateStr.getMonth();
    let date =
      dateStr.getDate() < 10 ? "0" + dateStr.getDate() : dateStr.getDate();

    return dateStr.getFullYear() + "." + month + "." + date;
  }
  function dateToTime(orgTime) {
    let timeObj = new Date(orgTime);
    let hour =
      timeObj.getHours() < 10 ? "0" + timeObj.getHours() : timeObj.getHours();
    let minute =
      timeObj.getMinutes() < 10
        ? "0" + timeObj.getMinutes()
        : timeObj.getMinutes();
    return hour + ":" + minute;
  }
  function yearStartDate() {
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate = startDate.toISOString();
    startDate = ISOtoYMD(startDate);
    return startDate;
  }
  function yearEndDate() {
    let endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    endDate = endDate.toISOString();
    endDate = ISOtoYMD(endDate);
    return endDate;
  }
  function weekStartDate(date) {
    let yoill = new Date(date).getDay();
    let currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - yoill);
    currentDate = currentDate.toISOString();
    currentDate = ISOtoYMD(currentDate);
    return currentDate;
  }
  function weekEndDate(date) {
    let yoill = new Date(date).getDay();
    let currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - yoill + 6);
    currentDate = currentDate.toISOString();
    currentDate = ISOtoYMD(currentDate);
    return currentDate;
  }
  function getDatesStartToLast(startDate, lastDate) {
    var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!(regex.test(startDate) && regex.test(lastDate)))
      return "Not Date Format";
    var result = [];
    var curDate = new Date(startDate);
    while (curDate <= new Date(lastDate)) {
      result.push(curDate.toISOString().split("T")[0]);
      curDate.setDate(curDate.getDate() + 1);
    }
    return result;
  }

  function ISOtoYMD(date) {
    return date.substring(0, date.indexOf("T"));
  }
  function dateToYear(date) {
    return date.split("-")[0];
  }
  function dateToMonth(date) {
    return date.split("-")[1];
  }
  function dateToDay(date) {
    return date.split("-")[2];
  }
  // function onClickMultiplex(id) {
  //   if (id === selectedMultiplexId) {
  //     setSelectedMultiplexId("");
  //   } else {
  //     setSelectedMultiplexId(id);
  //   }
  // }
};

export default ScheduleSection;
