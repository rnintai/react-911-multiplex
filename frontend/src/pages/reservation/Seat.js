import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

function Seat({ location }) {
  // state
  const [scheduleInfo, setScheduleInfo] = useState({});
  const [reservedSeatList, setReservedSeatList] = useState([]);
  const [theaterSeatList, setTheaterSeatList] = useState([]);

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
    res.data.theaterSeatList.forEach((element) => {
      theaterSeatListCpy.push(element.seat_name);
    });
    setTheaterSeatList(theaterSeatListCpy);
  }

  // 해당 스케줄의 좌석 점유 정보 받아오기
  async function fetchReservedSeat() {
    const res = await axios.get(API + "/tickets/reservedseat/" + scheduleId);
    let reservedSeatListCpy = [];
    res.data.reservedSeatList.forEach((element) => {
      reservedSeatListCpy.push(element.seat_name);
    });
    setReservedSeatList(reservedSeatListCpy);
  }

  useEffect(() => {
    fetchMovieSchedule();
  }, []);
  // 영화 스케줄 fetch 완료 시 호출
  useEffect(() => {
    fetchTheaterSeat();
    fetchReservedSeat();
  }, [scheduleInfo]);

  return (
    <article className="container">
      <section className="flex-row">
        <div
          className="border-gray"
          style={{ width: "65%", height: 700, marginRight: 10 }}
        >
          {/* {theaterSeatList.map((elem) => ( */}
          {/* // <div>{elem.substr(0, 1)}</div> */}
          {/* ))} */}
        </div>
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
}

export default Seat;
