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
  const reservationCode = query.reservationCode;
  const scheduleId = query.scheduleId;

  // state
  const [scheduleInfo, setScheduleInfo] = useState({});
  const [reservationInfo, setReservationInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // 스케줄 info
  const movieId = scheduleInfo.movie_id;
  const movieNm = scheduleInfo.movie_name;
  const poster = scheduleInfo.poster;
  const rate = scheduleInfo.age_limit;
  const multiplexId = scheduleInfo.multiplex_id;
  const multiplexNm = scheduleInfo.multiplex_name;
  const theaterId = scheduleInfo.theater_id;
  const theaterNm = scheduleInfo.theater_name;
  const theaterType = scheduleInfo.theater_type;
  const ticketPrice = scheduleInfo.theater_ticket_price;
  const startTm = ISOtoHHMM(scheduleInfo.movie_schedule_start);
  const endTm = ISOtoHHMM(scheduleInfo.movie_schedule_end);

  // 예약 정보
  const seat = reservationInfo.seat_name;

  // 스케줄 정보
  async function getScheduleInfo() {
    try {
      const res = await axios.get(API + "/tickets/schedule/id/" + scheduleId);
      setScheduleInfo(res.data.scheduleInfo);
    } catch (err) {
      console.log(err);
    }
  }

  // 예매 정보
  async function getReservationInfo() {
    try {
      const res = await axios.get(
        API + "/tickets/reservation/info/" + reservationCode
      );
      setReservationInfo(res.data.reservationInfo);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    getScheduleInfo();
    getReservationInfo();
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
                  <Font
                    size={FontSize.default}
                    boldness={FontBold.light}
                    style={{ marginRight: 4 }}
                  >
                    &gt;
                  </Font>
                  <Font size={FontSize.default} boldness={FontBold.light}>
                    {theaterNm}
                  </Font>
                </div>
                <div className="flex-row" style={{ marginBottom: 8 }}>
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
                <div className="flex-row">
                  <Font
                    size={FontSize.default}
                    boldness={FontBold.light}
                    style={{ marginRight: 4 }}
                  >
                    좌석:
                  </Font>
                  <Font
                    size={FontSize.default}
                    boldness={FontBold.default}
                    color={FontColor.red75}
                    style={{ marginRight: 4 }}
                  >
                    {seat}
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
