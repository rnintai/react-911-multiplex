import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Font,
  FontSize,
  FontBold,
  FontColor,
} from "src/design-system/font/Font";
import ReservationSection from "src/components/reservation/ReservationCard";
import "./MyReservation.scss";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

function MyReservation({ userId }) {
  const [reservationList, setReservationList] = useState([]);

  // 비회원용 예매번호 state
  const [reservationId, setReservationId] = useState("");

  async function getReservationList() {
    let curPage = 1;
    let reservationListCpy = [];
    while (1) {
      try {
        const response = await axios.get(
          API + `/tickets/reservation/list/${curPage}/${userId}`
        );
        if (response.data.reservationList.length === 0) {
          break;
        }
        reservationListCpy.push(...response.data.reservationList);
        curPage = curPage + 1;
      } catch (e) {
        console.log(e);
      }
      setReservationList(reservationListCpy);
    }
  }

  useEffect(() => {
    if (userId !== "") {
      getReservationList();
    }
  }, []);

  return (
    <div className="my-res-wrap flex-col">
      {userId === "" && <Font>예매번호</Font>}
      {userId !== "" && (
        <>
          {" "}
          <Font
            size={FontSize.lg}
            boldness={FontBold.bold}
            style={{ marginBottom: 15 }}
          >
            {userId}님의 예매내역
          </Font>
          {reservationList.map((rsrv) => (
            <div style={{ marginBottom: 20 }}>
              <ReservationSection
                poster={rsrv.poster}
                reservationCode={rsrv.movie_reservation_id}
                rate={rsrv.age_limit}
                movieNm={rsrv.movie_name}
                theaterType={rsrv.theater_type}
                multiplexNm={rsrv.multiplex_name}
                theaterNm={rsrv.theater_name}
                startTm={ISOtoHHMM(rsrv.movie_schedule_start)}
                endTm={ISOtoHHMM(rsrv.movie_schedule_end)}
                seat={rsrv.seat_name}
                totalPrice={formatPrice(rsrv.total_price)}
                key={rsrv.movie_reservation_id}
              ></ReservationSection>
            </div>
          ))}
        </>
      )}
    </div>
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

export default MyReservation;
