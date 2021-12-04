import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Spinner from "src/components/basic/Spinner";
import SeatSection from "src/components/reservation/SeatSection";
import "./seat.scss";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

function Seat() {
  // state
  const [scheduleInfo, setScheduleInfo] = useState({});
  const [theaterSeatList, setTheaterSeatList] = useState([]);
  const [reservedSeatList, setReservedSeatList] = useState([]);

  // loading
  const [loading, setLoading] = useState(true);

  // selected seat
  const [selectedSeatList, setSelectedSeatList] = useState([]);

  // 쿼리 파라미터
  const scheduleId = useLocation().search.split("id=")[1];

  // 스케줄id로 스케줄 정보 조회
  async function fetchMovieSchedule() {
    const res = await axios.get(
      API + "/admin/tickets/schedule/id/" + scheduleId
    );
    setScheduleInfo(res.data.scheduleInfo);
  }

  // 해당 상영관의 좌석 배치 받아오기
  async function fetchTheaterSeat() {
    const res = await axios.get(
      API + "/theater/seat/" + scheduleInfo.theater_id
    );
    let theaterSeatListCpy = [];
    let seatRowList = [];
    let prevRow = "A";
    res.data.theaterSeatList.forEach((element) => {
      if (prevRow !== element.seat_row) {
        theaterSeatListCpy.push(seatRowList);
        seatRowList = [];
        seatRowList.push(true);
        // seatRowList.push(element.seat_row + element.seat_col);
      } else {
        seatRowList.push(true);
        // seatRowList.push(element.seat_row + element.seat_col);
      }
      prevRow = element.seat_row;
    });
    theaterSeatListCpy.push(seatRowList);
    setTheaterSeatList(theaterSeatListCpy);
  }

  // 해당 스케줄의 좌석 점유 정보 받아오기
  async function fetchReservedSeat() {
    const res = await axios.get(API + "/tickets/reservedseat/" + scheduleId);
    let reservedSeatListCpy = theaterSeatList;
    res.data.reservedSeatList.forEach((element) => {
      let row = parseRowToIndex(element.seat_row);
      let col = parseColToIndex(element.seat_col);
      reservedSeatListCpy[row][col] = false;
    });
    setReservedSeatList(reservedSeatListCpy);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovieSchedule();
  }, []);
  // 영화 스케줄 fetch 완료 시 호출
  useEffect(() => {
    fetchTheaterSeat();
    //
  }, [scheduleInfo]);
  // 자리 정보 받아오고 호출.
  useEffect(() => {
    if (theaterSeatList.length > 1) {
      fetchReservedSeat();
    }
  }, [theaterSeatList]);

  return (
    <article className="container">
      <section className="flex-row">
        <SeatSection
          loading={loading}
          reservedSeatList={reservedSeatList}
          selectedSeatList={selectedSeatList}
          setSelectedSeatList={setSelectedSeatList}
        ></SeatSection>
        <section className="flex-col" style={{ width: "35%", height: 700 }}>
          <div
            className="border-gray"
            style={{ height: "60%", marginBottom: 10 }}
          >
            스케줄정보
          </div>
          <div className="border-gray" style={{ height: "40%" }}>
            금액
          </div>
        </section>
        {/* <SeatSection></SeatSection>
      <ReservationInfoSection></ReservationInfoSection> */}
      </section>
    </article>
  );

  function parseRowToIndex(row) {
    return row.charCodeAt() - "A".charCodeAt();
  }
  function parseColToIndex(col) {
    return Number(col) - 1;
  }
}

export default Seat;
