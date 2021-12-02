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
  const [selectedDate, setSelectedDate] = useState(
    ISOtoYMD(new Date().toISOString())
  );
  const [curWeekList, setCurWeekList] = useState([]);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    setFilteredScheduleList(scheduleList);
    setDateList(getDatesStartToLast(yearStartDate(), yearEndDate()));
    setCurWeekList(
      getDatesStartToLast(
        weekStartDate(selectedDate),
        weekEndDate(selectedDate)
      )
    );
  }, [scheduleList]);
  // 영화 및 지점 선택 시 호출
  useEffect(() => {
    filterScheduleListWithSelection(selectedMovieId, selectedMultiplexId);
  }, [selectedMovieId, selectedMultiplexId]);

  // 선택 날짜 변경 시 필터링.
  useEffect(() => {}, [selectedDate]);

  return (
    <div className="row-1_2">
      <div
        className={
          selectedMovieId === "" || selectedMultiplexId === ""
            ? "flex-col date-container disabled"
            : "flex-col date-container"
        }
      >
        <div
          className="flex-row justify-cen"
          style={{ width: "100%", position: "relative" }}
        >
          <div className="date-btn">
            <i class="fas fa-caret-left" onClick={onClickLeft}></i>
          </div>
          {curWeekList.map((elem, idx) => (
            <div
              className={
                elem === selectedDate
                  ? "flex-row justify-cen date-selector selected"
                  : "flex-row justify-cen date-selector"
              }
              style={{ width: 40, height: 40, position: "relative" }}
              key={elem}
              onClick={() => onClickDateBtn(elem)}
            >
              {/* 각 날짜 표시 */}
              <div className="flex-col" style={{ fontSize: 14 }}>
                {idx === 3 && (
                  <Font
                    size={FontSize.xs}
                    color={FontColor.blue75}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 7,
                    }}
                  >
                    {dateToYear(elem).substr(2, 2) + "/" + dateToMonth(elem)}
                  </Font>
                )}
                <Font color={dayColor(elem)}>{dateToDay(elem)}</Font>
              </div>
            </div>
          ))}
          <div className="date-btn">
            <i class="fas fa-caret-right" onClick={onClickRight}></i>
          </div>
        </div>
      </div>
      <div className="flex-row row-1/2">
        <div className="flex-col selection-container" style={{ width: "100%" }}>
          {selectedMovieId !== "" &&
            selectedMultiplexId !== "" &&
            filteredScheduleList.map((elem) => (
              <ScheduleCard
                // date={parseDateOnly(elem.movie_schedule_start)}
                startTime={dateToTime(elem.movie_schedule_start)}
                endTime={dateToTime(elem.movie_schedule_end)}
                movieName={elem.movie_name}
                theaterName={elem.theater_name}
                theaterType={elem.theater_type}
                availSeat="잔여"
                totalSeat="총"
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
    console.log(selectedDate, ISOtoYMD(scheduleList[0].movie_schedule_start));
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

  // 날짜 관련 함수들
  // function parseDateOnly(orgTime) {
  //   let dateStr = new Date(orgTime);
  //   let month =
  //     dateStr.getMonth() < 10 ? "0" + dateStr.getMonth() : dateStr.getMonth();
  //   let date =
  //     dateStr.getDate() < 10 ? "0" + dateStr.getDate() : dateStr.getDate();

  //   return dateStr.getFullYear() + "." + month + "." + date;
  // }
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
  // 예매 시스템이 커버 할 첫 날짜 (-1개월)
  function yearStartDate() {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    startDate = startDate.toISOString();
    startDate = ISOtoYMD(startDate);
    return startDate;
  }
  // 예매 시스템이 커버 할 마지막 날짜 (+3개월)
  function yearEndDate() {
    let endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);
    endDate = endDate.toISOString();
    endDate = ISOtoYMD(endDate);
    return endDate;
  }
  // date가 해당하는 주의 첫 날 반환
  function weekStartDate(date) {
    let yoill = new Date(date).getDay();
    let currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - yoill);
    currentDate = currentDate.toISOString();
    currentDate = ISOtoYMD(currentDate);
    return currentDate;
  }
  // date가 해당하는 주의 마지막 날 반환
  function weekEndDate(date) {
    let yoill = new Date(date).getDay();
    let currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - yoill + 6);
    currentDate = currentDate.toISOString();
    currentDate = ISOtoYMD(currentDate);
    return currentDate;
  }
  // 시작, 종료 날짜 사이의 모든 날을 나열한 배열
  function getDatesStartToLast(startDate, lastDate) {
    var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!(regex.test(startDate) && regex.test(lastDate)))
      return "Not Date Format";
    var result = [];
    var selectedDate = new Date(startDate);
    while (selectedDate <= new Date(lastDate)) {
      result.push(selectedDate.toISOString().split("T")[0]);
      selectedDate.setDate(selectedDate.getDate() + 1);
    }
    return result;
  }

  // ISOString형식에서 YYMMDD로 바꾸어 주는 함수
  function ISOtoYMD(date) {
    return date.substring(0, date.indexOf("T"));
  }
  // YYMMDD 중 YY 추출
  function dateToYear(date) {
    return date.split("-")[0];
  }
  // YYMMDD 중 MM 추출
  function dateToMonth(date) {
    return date.split("-")[1];
  }
  // YYMMDD 중 DD 추출
  function dateToDay(date) {
    return date.split("-")[2];
  }

  // 날짜 주말 색상
  function dayColor(date) {
    let result = FontColor.gray75;
    let dateObj = new Date(date);
    if (dateObj.getDay() === 0) {
      result = FontColor.red50;
    } else if (dateObj.getDay() === 6) {
      result = FontColor.blue75;
    } else {
      if (date === selectedDate) {
        result = FontColor.white;
      }
    }
    return result;
  }

  // 날짜 클릭 시
  function onClickDateBtn(elem) {
    setSelectedDate(elem);
    // 이후 로직은 useEffect에서 selectedDate 변경 시.
  }
  // 날짜 이동 버튼 클릭
  function onClickLeft() {
    let dateObj = new Date(curWeekList[4]);
    dateObj.setDate(dateObj.getDate() - 7);
    setCurWeekList(
      getDatesStartToLast(weekStartDate(dateObj), weekEndDate(dateObj))
    );
  }
  function onClickRight() {
    let dateObj = new Date(curWeekList[4]);
    dateObj.setDate(dateObj.getDate() + 7);
    setCurWeekList(
      getDatesStartToLast(weekStartDate(dateObj), weekEndDate(dateObj))
    );
  }
};

export default ScheduleSection;
