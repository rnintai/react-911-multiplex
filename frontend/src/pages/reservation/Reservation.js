import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Table } from "../../../components/admin/movie/Table";
import MovieSection from "src/components/reservation/MovieSection";
import MultiplexSection from "src/components/reservation/MultiplexSection";
import ScheduleSection from "src/components/reservation/ScheduleSection";

import { Link } from "react-router-dom";

import { Button, BgColor } from "src/design-system/button/Button";
import Spinner from "src/components/basic/Spinner";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";
import "./reservation.scss";
import "src/App.css";
//
const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

const Reservation = () => {
  const [loading, setLoading] = useState(true);

  // 데이터 목록
  const [scheduleList, setScheduleList] = useState([]);
  const [multiplexList, setMultiplexList] = useState([]);
  const [theaterList, setTheaterList] = useState([]);

  // 선택된 아이템
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedMultiplexId, setSelectedMultiplexId] = useState("");
  const [selectedScheduleId, setSelectedScheduleId] = useState("");

  // 필터링 된 스케줄 리스트
  const [filteredScheduleList, setFilteredScheduleList] = useState([]);

  const getSchedule = async () => {
    let curPage = 1;
    let scheduleListCpy = [];
    let fromDate = new Date().toISOString().split("T")[0];

    while (1) {
      try {
        const response = await axios.get(
          API + `/tickets/schedule/list/${fromDate}/${curPage}`
        );
        if (response.data.scheduleList.length === 0) {
          break;
        }
        scheduleListCpy.push(...response.data.scheduleList);
        curPage = curPage + 1;
      } catch (e) {
        console.log(e);
      }
    }
    // 과거 필터링
    scheduleListCpy = scheduleListCpy.filter(
      (elem) => elem.movie_schedule_start >= new Date().toISOString()
    );
    setScheduleList(scheduleListCpy);
  };
  // 모든 지점을 받아옴.
  const getMultiplexList = async () => {
    let curPage = 1;
    let multplexListCpy = [];
    while (1) {
      try {
        const response = await axios.get(
          API + "/admin/multiplex/list/" + curPage
        );
        if (response.data.multiplexList.length === 0) {
          break;
        }
        multplexListCpy.push(...response.data.multiplexList);
        curPage = curPage + 1;
      } catch (e) {
        console.log(e);
      }
    }
    setMultiplexList(multplexListCpy);
  };
  const getTheaterList = async () => {
    let curPage = 1;
    let theaterListCpy = [];
    while (1) {
      try {
        const response = await axios.get(
          API + "/admin/theater/list/" + curPage
        );
        if (response.data.theaterList.length === 0) {
          break;
        }
        theaterListCpy.push(...response.data.theaterList);
        curPage = curPage + 1;
      } catch (e) {
        console.log(e);
      }
    }
    setTheaterList(theaterListCpy);
    setLoading(false);
  };
  // 스케줄 점유좌석 수 받아오기
  // const getReservedSeatList = async () => {
  //   let curPage = 1;
  //   let theaterListCpy = [];
  //   let fromDate = new Date().toISOString.split("T")[0];
  //   while (1) {
  //     try {
  //       const response = await axios.get(
  //         API + `/tickets/reservedseat/${fromDate}/${curPage}`
  //       );
  //       if (response.data.theaterList.length === 0) {
  //         break;
  //       }
  //       theaterListCpy.push(...response.data.theaterList);
  //       curPage = curPage + 1;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };

  useEffect(() => {
    getSchedule();
    getMultiplexList();
    getTheaterList();
  }, []);
  return (
    <>
      <section className="res-container">
        <Font
          tag="span"
          size={FontSize.xl}
          boldness={FontBold.bold}
          style={{ margin: "0 0 10px 10px", display: "inline-block" }}
        >
          예매하기
        </Font>
        <div
          className="res-wrap flex-row"
          style={{
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {!loading && scheduleList && (
            <>
              <MovieSection
                loading={loading}
                scheduleList={scheduleList}
                selectedMovieId={selectedMovieId}
                selectedMultiplexId={selectedMultiplexId}
                setSelectedMovieId={setSelectedMovieId}
                setSelectedMultiplexId={setSelectedMultiplexId}
                setSelectedScheduleId={setSelectedScheduleId}
                filteredScheduleList={filteredScheduleList}
              ></MovieSection>
              <MultiplexSection
                scheduleList={scheduleList}
                selectedMovieId={selectedMovieId}
                setSelectedMovieId={setSelectedMovieId}
                selectedMultiplexId={selectedMultiplexId}
                setSelectedMultiplexId={setSelectedMultiplexId}
                setSelectedScheduleId={setSelectedScheduleId}
                filteredScheduleList={filteredScheduleList}
                // selectedTheaterId={selectedTheaterId}
                // setSelectedTheaterId={setSelectedTheaterId}
              ></MultiplexSection>
              <ScheduleSection
                scheduleList={scheduleList}
                selectedMovieId={selectedMovieId}
                selectedMultiplexId={selectedMultiplexId}
                filteredScheduleList={filteredScheduleList}
                setFilteredScheduleList={setFilteredScheduleList}
                selectedScheduleId={selectedScheduleId}
                setSelectedScheduleId={setSelectedScheduleId}
              ></ScheduleSection>
            </>
          )}
          {loading && <Spinner color="#d8d8d8"></Spinner>}
        </div>
      </section>
      <div
        className="flex-row justify-sb"
        style={{ width: 1100, margin: "0 auto", marginTop: 20 }}
      >
        <Button
          background={BgColor.green}
          color={FontColor.white}
          style={{
            boxShadow: "rgb(0 0 0 / 31%) 1px 1px 4px",
          }}
          onClick={onClickResetButton}
        >
          초기화
        </Button>
        <Button
          className={nextButtonClass()}
          background={BgColor.skyblue}
          style={{
            boxShadow: "rgb(0 0 0 / 31%) 1px 1px 4px",
          }}
        >
          <Link to={"/reservation/seat?id=" + selectedScheduleId}>
            <Font color={FontColor.white}>다음 &gt;</Font>
          </Link>
        </Button>
      </div>
    </>
  );

  // 리셋 버튼 클릭 핸들러
  function onClickResetButton() {
    setSelectedScheduleId("");
    setSelectedMovieId("");
    setSelectedMultiplexId("");
  }

  // 다음 버튼 클래스 정의
  function nextButtonClass() {
    if (selectedScheduleId === "") {
      return "next-btn disabled";
    } else {
      return "next-btn";
    }
  }
};

export default Reservation;
