import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Table } from "../../../components/admin/movie/Table";
import MovieSection from "src/components/reservation/movieSection";
import { Button, BgColor } from "src/design-system/button/Button";
import Spinner from "src/components/basic/spinner";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";
import "./reservation.scss";
import "src/App.css";

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
  const [selectedTheaterId, setSelectedTheaterId] = useState("");

  const getSchedule = async () => {
    let curPage = 1;
    let scheduleListCpy = [];
    while (1) {
      try {
        const response = await axios.get(
          API + "/admin/tickets/schedule/" + curPage
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
        <div className="res-wrap border-gray flex-row">
          {/* <div className="flex-"></div> */}
          {!loading && scheduleList && (
            <>
              <MovieSection
                scheduleList={scheduleList}
                selectedMovieId={selectedMovieId}
                setSelectedMovieId={setSelectedMovieId}
              ></MovieSection>
              <div className="row-1_3">지점</div>
              <div className="row-1_3">시간</div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Reservation;
