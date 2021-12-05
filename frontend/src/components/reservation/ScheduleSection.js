import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./selection.scss";

import ScheduleCard from "./ScheduleCard";

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
  selectedScheduleId,
  setSelectedScheduleId,
}) => {
  // const [dateCursor, setDateCursor] = useState(
  // );
  const [selectedDate, setSelectedDate] = useState("");
  const [curWeekList, setCurWeekList] = useState([]);
  const [dateList, setDateList] = useState([]);
  // 최종 스케줄 리스트
  const [finalScheduleList, setFinalScheduleList] = useState([]);
  // 지금 주 페이지
  const [curWeekPage, setCurWeekPage] = useState(0);
  // 오늘 날짜.
  let datePivot = ISOtoYMD(new Date().toISOString());

  useEffect(() => {
    setFilteredScheduleList(scheduleList);
    setDateList(getDatesStartToLast(yearStartDate(), yearEndDate()));
    // 오늘 기준으로 일주일을 보여줌.
    setCurWeekList(
      getDatesStartToLast(weekStartDate(datePivot), weekEndDate(datePivot))
    );
  }, [scheduleList]);

  // 영화 및 지점 선택 시 호출
  useEffect(() => {
    filterScheduleListWithSelection(selectedMovieId, selectedMultiplexId);
    // 앞의 선택을 변경하면 선택된 날짜 및 결과 리스트 초기화.
    setSelectedDate("");
    setFinalScheduleList([]);
  }, [selectedMovieId, selectedMultiplexId]);

  // 선택 날짜 변경 시 필터링.
  useEffect(() => {
    if (selectedMovieId !== "" && selectedMultiplexId !== "") {
      filterScheduleByDate();
    }
  }, [selectedDate]);

  return (
    <div className="row-1_2 border-gray" style={{ height: 330 }}>
      <div
        className={
          selectedMovieId === "" || selectedMultiplexId === ""
            ? "flex-col date-container disabled"
            : "flex-col date-container"
        }
        style={{ marginTop: 10 }}
      >
        <div
          className="flex-row justify-cen"
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <div className={curWeekPage > 0 ? "date-btn" : "date-btn disabled"}>
            <i className="fas fa-caret-left" onClick={onClickLeft}></i>
          </div>
          {curWeekList.map((elem, idx) => (
            <div
              className={dateSelectorClass(elem)}
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
                    boldness={FontBold.bold}
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "9px",
                      letterSpacing: "-1px",
                    }}
                  >
                    {dateToYear(elem).substr(2, 2) + "/" + dateToMonth(elem)}
                  </Font>
                )}
                <Font size={FontSize.sm} color={dayColorClass(elem)}>
                  {dateToDay(elem)}
                </Font>
              </div>
            </div>
          ))}
          <div className={curWeekPage < 12 ? "date-btn" : "date-btn disabled"}>
            <i className="fas fa-caret-right" onClick={onClickRight}></i>
          </div>
        </div>
      </div>
      <div className="flex-row row-1/2">
        <div
          className="flex-col selection-container"
          style={{ width: "100%", borderTop: "1px solid rgb(217, 217, 217)" }}
        >
          {selectedMovieId !== "" &&
            selectedMultiplexId !== "" &&
            selectedDate !== "" &&
            finalScheduleList.map((elem) => (
              <ScheduleCard
                // date={parseDateOnly(elem.movie_schedule_start)}
                scheduleId={elem.movie_schedule_id}
                startTime={dateToTime(elem.movie_schedule_start)}
                endTime={dateToTime(elem.movie_schedule_end)}
                movieName={elem.movie_name}
                theaterName={elem.theater_name}
                theaterType={elem.theater_type}
                availSeat={elem.total_seat - elem.reserved_count}
                totalSeat={elem.total_seat}
                key={elem.movie_schedule_id}
                selectedScheduleId={selectedScheduleId}
                setSelectedScheduleId={setSelectedScheduleId}
              ></ScheduleCard>
            ))}
          {selectedMovieId !== "" &&
            selectedMultiplexId !== "" &&
            selectedDate === "" && (
              <Font
                color={FontColor.gray50}
                style={{ marginLeft: 10, marginTop: 10 }}
              >
                날짜를 선택해주세요.
              </Font>
            )}
          {(selectedMovieId === "" || selectedMultiplexId === "") && (
            <Font
              color={FontColor.gray50}
              style={{ marginLeft: 10, marginTop: 10 }}
            >
              영화 및 지점을 선택해주세요.
            </Font>
          )}
        </div>
      </div>
    </div>
  );

  // 영화 or 지점 선택시 리스트 필터링
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
  // 날짜 선택 시 표시될 상영스케줄 필터링.
  function filterScheduleByDate() {
    let listCpy = filteredScheduleList;
    // console.log(selectedDate, ISOtoYMD(listCpy[0].movie_schedule_start));
    listCpy = listCpy.filter(
      (elem) => selectedDate === ISOtoYMD(elem.movie_schedule_start)
    );
    setFinalScheduleList(listCpy);
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
    // startDate.setMonth(startDate.getMonth() - 2);
    startDate.setDate(startDate.getDate() - 7 * 5);
    startDate = ISOtoYMD(startDate.toISOString());
    return startDate;
  }
  // 예매 시스템이 커버 할 마지막 날짜 (+3개월)
  function yearEndDate() {
    let endDate = new Date();
    // endDate.setMonth(endDate.getMonth() + 4);
    endDate.setDate(endDate.getDate() + 7 * 13);
    endDate = ISOtoYMD(endDate.toISOString());
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
    // var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    // if (!(regex.test(startDate) && regex.test(lastDate)))
    //   return "Not Date Format";
    var result = [];
    var tmpDate = new Date(startDate);
    while (tmpDate <= new Date(lastDate)) {
      result.push(tmpDate.toISOString().split("T")[0]);
      tmpDate.setDate(tmpDate.getDate() + 1);
    }
    return result;
  }

  // ISOString형식에서 YYMMDD로 바꾸어 주는 함수
  function ISOtoYMD(date) {
    // new Date(date.substring(0, date.indexOf("T")));
    let dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month =
      dateObj.getMonth() < 10
        ? `0${dateObj.getMonth() + 1}`
        : dateObj.getMonth() + 1;
    const day =
      dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
    return `${year}-${month}-${day}`;
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

  // 날짜 주말 색상 클래스 지정
  function dayColorClass(date) {
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
  // unavailable한 날짜는 disable시켜주는 class
  function dateSelectorClass(date) {
    let resultClass = "date-selector flex-row justify-cen";
    if (date === selectedDate) {
      resultClass += " selected";
    }
    const scheduleOfDate = filteredScheduleList.filter(
      (elem) => ISOtoYMD(elem.movie_schedule_start) === date
    );
    if (scheduleOfDate.length === 0) {
      resultClass += " disabled";
    }

    return resultClass;
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
    setCurWeekPage(curWeekPage - 1);
  }
  function onClickRight() {
    let dateObj = new Date(curWeekList[4]);
    dateObj.setDate(dateObj.getDate() + 7);
    setCurWeekList(
      getDatesStartToLast(weekStartDate(dateObj), weekEndDate(dateObj))
    );
    setCurWeekPage(curWeekPage + 1);
  }
};

export default ScheduleSection;
