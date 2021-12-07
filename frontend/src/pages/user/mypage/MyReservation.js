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
import Spinner from "src/components/basic/Spinner";
import Input from "src/components/basic/Input";
import { Button, BgColor } from "src/design-system/button/Button";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

function MyReservation({ userId }) {
  const [reservationList, setReservationList] = useState([]);

  // 회원 로딩
  const [memberLoading, setMemberLoading] = useState(true);
  // 비회원용 예매번호 state
  const [reservationId, setReservationId] = useState("");
  // 비회원용 예매정보
  const [reservationInfo, setReservationInfo] = useState({});
  const [nonMemberLoading, setNonMemberLoading] = useState(-1);

  // 회원용
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
      setMemberLoading(false);
    }
  }

  // 비회원용
  async function getReservationInfo() {
    setNonMemberLoading(1);
    try {
      const response = await axios.get(
        API + `/tickets/reservation/info/${reservationId}`
      );
      setReservationInfo(response.data.reservationInfo);
    } catch (e) {
      console.log(e);
    }
    setNonMemberLoading(0);
  }

  useEffect(() => {
    if (userId !== "") {
      getReservationList();
    }
  }, []);

  return (
    <div className="my-res-wrap flex-col">
      {userId === "" && (
        <div className="flex-col">
          <div className="flex-col" style={{ width: 100 }}>
            <Input
              name="reservationId"
              type="text"
              state={reservationId}
              setState={setReservationId}
              labelText="예매번호"
            ></Input>
            <Button
              background={BgColor.green}
              color={FontColor.white}
              style={{
                width: 60,
                marginTop: 8,
              }}
              onClick={getReservationInfo}
            >
              조회
            </Button>
          </div>
          <div className="flex-row justify-cen">
            {nonMemberLoading === 1 && <Spinner></Spinner>}
            {nonMemberLoading === 0 &&
              Object.keys(reservationInfo).length !== 0 && (
                <ReservationSection
                  poster={reservationInfo.poster}
                  reservationCode={reservationInfo.movie_reservation_id}
                  reservationDate={
                    reservationInfo.movie_reservation_date
                      .replace("T", " ")
                      .split(".")[0]
                  }
                  rate={reservationInfo.age_limit}
                  movieNm={reservationInfo.movie_name}
                  theaterType={reservationInfo.theater_type}
                  multiplexNm={reservationInfo.multiplex_name}
                  theaterNm={reservationInfo.theater_name}
                  startTm={ISOtoHHMM(reservationInfo.movie_schedule_start)}
                  endTm={ISOtoHHMM(reservationInfo.movie_schedule_end)}
                  seat={reservationInfo.seat_name}
                  totalPrice={formatPrice(reservationInfo.total_price)}
                ></ReservationSection>
              )}
            {nonMemberLoading === 0 &&
              Object.keys(reservationInfo).length === 0 && (
                <Font>조회 결과가 없습니다.</Font>
              )}
          </div>
        </div>
      )}
      {userId !== "" && (
        <>
          <Font
            size={FontSize.lg}
            boldness={FontBold.bold}
            style={{ marginBottom: 15 }}
          >
            {userId}님의 예매내역
          </Font>
          {memberLoading === true && (
            <div style={{ marginTop: 200 }}>
              <Spinner></Spinner>
            </div>
          )}
          {memberLoading === false &&
            reservationList.map((rsrv) => (
              <div key={rsrv.movie_reservation_id} style={{ marginBottom: 20 }}>
                <ReservationSection
                  poster={rsrv.poster}
                  reservationCode={rsrv.movie_reservation_id}
                  reservationDate={
                    rsrv.movie_reservation_date.replace("T", " ").split(".")[0]
                  }
                  rate={rsrv.age_limit}
                  movieNm={rsrv.movie_name}
                  theaterType={rsrv.theater_type}
                  multiplexNm={rsrv.multiplex_name}
                  theaterNm={rsrv.theater_name}
                  startTm={ISOtoHHMM(rsrv.movie_schedule_start)}
                  endTm={ISOtoHHMM(rsrv.movie_schedule_end)}
                  seat={rsrv.seat_name}
                  totalPrice={formatPrice(rsrv.total_price)}
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
    console.log(date);

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
