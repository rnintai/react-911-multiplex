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
  // 영화 및 지점 선택 시 호출
  useEffect(() => {
    setFilteredScheduleList(scheduleList);
  }, [scheduleList]);
  useEffect(() => {
    filterScheduleListWithSelection(selectedMovieId, selectedMultiplexId);
  }, [selectedMovieId, selectedMultiplexId]);

  return (
    <div className="row-1_2">
      <Font size={FontSize.lg} style={{ marginLeft: 10 }}>
        시간
      </Font>
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
          {/* {filteredScheduleList} */}
          {/* {multiplexList.map((elem) => (
            <div
              className={
                selectedMultiplexId === elem.multiplex_id
                  ? "selection-item selected"
                  : "selection-item"
              }
              style={{ padding: "2px" }}
              key={elem.theater_id}
              onClick={() => onClickMultiplex(elem.multiplex_id)}
            >
              <Font size={FontSize.sm} boldness={FontBold.light}>
                {elem.multiplex_name}
              </Font>
            </div>
          ))} */}
        </div>
        {/* <div
          className="flex-col selection-container row-1_2"
          style={{ margin: "10px 0 0 10px" }}
        >
          {theaterList.map((elem) => (
            <div
              className={
                selectedTheaterId === elem.theater_id
                  ? "selection-item selected"
                  : "selection-item"
              }
              style={{ padding: "0 2px" }}
              key={elem.theater_id}
              onClick={() => onClickTheater(elem.theater_id)}
            >
              <Font size={FontSize.sm} boldness={FontBold.light}>
                {elem.theater_name}
              </Font>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );

  function filterScheduleListWithSelection(movieId, multiplexId) {
    let scheduleListCpy = scheduleList;
    if (movieId === "" && multiplexId !== "") {
      // 영화 선택됨
      scheduleListCpy = scheduleListCpy.filter(
        (elem) => elem.movie_id === movieId
      );
    } else if (movieId !== "" && multiplexId === "") {
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

    return (
      dateStr.getFullYear() + "." + dateStr.getMonth() + "." + dateStr.getDate()
    );
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

  // function onClickMultiplex(id) {
  //   if (id === selectedMultiplexId) {
  //     setSelectedMultiplexId("");
  //   } else {
  //     setSelectedMultiplexId(id);
  //   }
  // }
};

export default ScheduleSection;
