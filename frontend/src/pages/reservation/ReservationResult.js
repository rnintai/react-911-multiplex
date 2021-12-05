import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import {
  Font,
  FontColor,
  FontSize,
  FontBold,
} from "src/design-system/font/Font";
import Spinner from "src/components/basic/Spinner";
import RatingMark from "src/components/admin/movie/RatingMark";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

function ReservationResult({ memberId }) {
  // query
  const query = queryString.parse(useLocation().search);
  const scheduleId = query.schedule;
  const seatString = query.seat;
  const totalPrice = query.price;

  // state
  const [scheduleInfo, setScheduleInfo] = useState({});
  const [reservationCode, setReservationCode] = useState("");
  const [loading, setLoading] = useState(true);
  // 예매 상태
  const [reservationLoading, setReservationLoading] = useState(true);
  const [reservationSuccess, setReservationSuccess] = useState(true);

  // info
  const movieId = scheduleInfo.movie_id;
  const movieNm = scheduleInfo.movie_name;
  const poster = scheduleInfo.poster;
  const rate = scheduleInfo.age_limit;
  const multiplexId = scheduleInfo.multiplex_id;
  const multiplexNm = scheduleInfo.multiplex_name;
  const theaterId = scheduleInfo.theater_id;
  const theaterNm = scheduleInfo.theater_name;
  const theaterType = scheduleInfo.theater_type;
  const startTm = ISOtoHHMM(scheduleInfo.movie_schedule_start);
  const endTm = ISOtoHHMM(scheduleInfo.movie_schedule_end);

  // 스케줄 정보
  async function getScheduleInfo() {
    const res = await axios.get(API + "/tickets/schedule/id/" + scheduleId);
    setScheduleInfo(res.data.scheduleInfo);
  }

  // 예매 번호 산출
  async function getReservationCountByDate() {
    const date = new Date().toISOString().split("T")[0];
    const res = await axios.get(API + "/tickets/reservation/date/" + date);
    let serial = res.data.count[0].reservation_count + 1;

    let dateArr = date.split("-").join("");
    serial = String(serial).split("");
    let serialArr = new Array("0", "0", "0", "0");

    let i = serialArr.length - 1;
    for (let j = serial.length - 1; j >= 0; j--) {
      serialArr[i] = serial[j];
      i = i - 1;
    }

    setReservationCode(dateArr + serialArr.join(""));
    setLoading(false);
  }

  // 예매 프로세스
  async function makeReservation() {
    // const member = memberId===undefined ? reservationCode:memberId;
    const res = await axios.post(API + "/tickets/reservation", {
      movieReservationId: reservationCode,
      // memberId: member,
      movieScheduleStart: startTm,
      seatName: seatString,
      multiplexId,
      theaterId,
      movieId,
      totalPrice,
      movieScheduleId: scheduleId,
    });
    console.log(res);
  }

  useEffect(() => {
    getScheduleInfo();
    getReservationCountByDate();
    // makeReservation();
  }, []);

  return (
    <article
      className="result-body"
      style={{ minHeight: "calc(100vh - 105px)", position: "relative" }}
    >
      <div
        className="flex-col"
        style={{
          width: 800,
          height: 200,
          margin: "auto",
        }}
      >
        {loading !== false && <Spinner color="#d8d8d8"></Spinner>}
        {loading !== true && (
          <>
            <Font
              className="text-center"
              size={FontSize.lg}
              boldness={FontBold.bold}
              style={{ marginBottom: 15 }}
            >
              예매가 완료되었습니다.
            </Font>
            <div className="flex-row justify-cen">
              <img src={poster} style={{ height: "180px" }} alt="poster"></img>

              <div
                className="flex-col border-gray justify-cen align-cen"
                style={{ width: 400, height: "100%" }}
              >
                <Font
                  size={FontSize.lg}
                  boldness={FontBold.default}
                  style={{ marginBottom: 8 }}
                >
                  예매번호: {reservationCode}
                </Font>
                <div className="flex-row">
                  <RatingMark rate={rate}></RatingMark>
                  <Font size={FontSize.lg} boldness={FontBold.default}>
                    {movieNm} ({theaterType})
                  </Font>
                </div>
                <div className="flex-row">
                  <Font
                    size={FontSize.default}
                    boldness={FontBold.light}
                    style={{ marginRight: 4 }}
                  >
                    {multiplexNm}
                  </Font>
                  <Font size={FontSize.default} boldness={FontBold.light}>
                    {theaterNm}
                  </Font>
                </div>
                <div className="flex-row">
                  <Font
                    size={FontSize.default}
                    boldness={FontBold.light}
                    style={{ marginRight: 4 }}
                  >
                    상영시간:
                  </Font>
                  <Font
                    size={FontSize.default}
                    boldness={FontBold.light}
                    style={{ marginRight: 4 }}
                  >
                    {startTm}
                  </Font>
                  <Font
                    size={FontSize.default}
                    boldness={FontBold.light}
                    style={{ marginRight: 4 }}
                  >
                    ~
                  </Font>
                  <Font size={FontSize.default} boldness={FontBold.light}>
                    {endTm}
                  </Font>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );

  // 시간 포맷
  function ISOtoHHMM(date) {
    let newDate = new Date(date);

    const hr =
      newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
    const mn =
      newDate.getMinutes() < 10
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes();

    return `${hr}:${mn}`;
  }
}

export default ReservationResult;
