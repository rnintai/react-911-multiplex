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
import ReservationSection from "src/components/reservation/ReservationCard";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

function ReservationResult({ userId }) {
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
  // const totalPrice =

  // 예약 정보
  const seat = reservationInfo.seat_name;
  const totalPrice = reservationInfo.total_price;
  const reservationDate = reservationInfo.reservation_date
    .replace("T", " ")
    .split(".")[0];

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
            <ReservationSection
              poster={poster}
              reservationCode={reservationCode}
              reservationDate={reservationDate}
              rate={rate}
              movieNm={movieNm}
              theaterType={theaterType}
              multiplexNm={multiplexNm}
              theaterNm={theaterNm}
              startTm={startTm}
              endTm={endTm}
              seat={seat}
              totalPrice={formatPrice(totalPrice)}
            ></ReservationSection>
            {userId === "" && (
              <Font
                className="text-center"
                color={FontColor.red50}
                style={{ marginTop: 10 }}
              >
                ※ 비회원 예매의 경우 <strong>예매번호</strong>를 통해 예매내역
                조회 및 취소할 수 있습니다.
              </Font>
            )}
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

  // 화폐 포맷
  function formatPrice(price) {
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });

    return formatter.format(price);
  }
}

export default ReservationResult;
