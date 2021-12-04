import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";
import { Button, BgColor } from "src/design-system/button/Button";
import RatingMark from "../admin/movie/RatingMark";
import Spinner from "../basic/Spinner";

function SeatInformation({
  loading,
  scheduleInfo,
  selectedSeatList,
  setSelectedSeatList,
}) {
  const movieNm = scheduleInfo.movie_name;
  const rate = scheduleInfo.age_limit;
  const multiplexNm = scheduleInfo.multiplex_name;
  const theaterNm = scheduleInfo.theater_name;
  const theaterType = scheduleInfo.theater_type;
  const ticketPrice = scheduleInfo.theater_ticket_price;
  const startTm = ISOtoHHMM(scheduleInfo.movie_schedule_start);
  const endTm = ISOtoHHMM(scheduleInfo.movie_schedule_end);

  // 청소년 할인율
  const juvenDiscountRatio = 0.3;

  // state
  const [adultCount, setAdultCount] = useState(0);
  const [juvenCount, setJuvenCount] = useState(0);

  // effect
  useEffect(() => {
    setAdultCount(selectedSeatList.length - juvenCount);
  }, [selectedSeatList]);

  return (
    <div
      // className="border-gray"
      style={{
        height: "60%",
        margin: "auto 0 0 0",
      }}
    >
      <div className="flex-col justify-sb " style={{ height: "100%" }}>
        <div className="flex-row justify-sb" style={{ marginBottom: 10 }}>
          <Button
            background={BgColor.gray75}
            color={FontColor.white}
            onClick={onClickReset}
          >
            <i class="fas fa-redo-alt" style={{ marginRight: 5 }}></i>초기화
          </Button>
          <Button background={BgColor.red50}>
            <Link to="./payment">
              <Font color={FontColor.white}>
                <i class="far fa-credit-card" style={{ marginRight: 5 }}></i>
                결제
              </Font>
            </Link>
          </Button>
        </div>
        {/* 영화정보 */}
        <div
          className="flex-row justify-sb border-gray"
          style={{
            height: "40%",
            padding: "20px 10px 20px 10px",
            marginBottom: 10,
          }}
        >
          {loading !== false && <Spinner color="#d8d8d8"></Spinner>}
          {loading !== true && (
            <>
              <div className="flex-row">
                <RatingMark rate={rate}></RatingMark>
                <div className="flex-col justify-cen">
                  <Font size={FontSize.default} boldness={FontBold.bold}>
                    {movieNm}
                  </Font>
                  <Font size={FontSize.sm} boldness={FontBold.light}>
                    {theaterType}
                  </Font>
                </div>
              </div>
              <div className="flex-row">
                <Font size={FontSize.sm} boldness={FontBold.light}>
                  {multiplexNm}
                </Font>
                <Font
                  size={FontSize.sm}
                  boldness={FontBold.light}
                  color={FontColor.gray50}
                >
                  &nbsp;|&nbsp;
                </Font>
                <Font size={FontSize.sm} boldness={FontBold.light}>
                  {theaterNm}
                </Font>
              </div>
              <div className="flex-col justify-cen">
                <Font size={FontSize.default} boldness={FontBold.bold}>
                  {startTm}
                </Font>
                <Font size={FontSize.sm} boldness={FontBold.light}>
                  ~{endTm}
                </Font>
              </div>
            </>
          )}
        </div>
        {/* 선택좌석 */}
        <div
          className="flex-col border-gray"
          style={{
            height: "30%",
            padding: "10px",
            marginBottom: 10,
          }}
        >
          <div className="flex-row justify-sb">
            <Font size={FontSize.default} boldness={FontBold.default}>
              선택좌석
            </Font>
            {juvenCount > 0 && (
              <Font
                size={FontSize.xs}
                color={FontColor.red25}
                boldness={FontBold.bold}
              >
                ※ 관람연령 미달 청소년은 부모님 동반 시만 관람 가능합니다.
              </Font>
            )}
          </div>
          <div className="flex-row" style={{ height: 27 }}>
            {selectedSeatList.map((seat) => (
              <Font
                size={FontSize.sm}
                boldness={FontBold.light}
                color={FontColor.white}
                className="info-seat border-gray"
                style={{ marginRight: 5 }}
                key={seat}
              >
                {seat}
              </Font>
            ))}
          </div>
          <div className="flex-row" style={{ justifyContent: "space-around" }}>
            <div className="flex-row">
              <Font
                size={FontSize.sm}
                boldness={FontBold.light}
                style={{ marginRight: 5 }}
              >
                성인
              </Font>
              <Button
                className="border-gray"
                size={FontSize.sm}
                style={{ padding: "0px 4px" }}
                onClick={onClickAdultMinus}
              >
                <i class="fas fa-minus"></i>
              </Button>
              <Font
                size={FontSize.sm}
                boldness={FontBold.light}
                style={{ margin: "0 5px" }}
              >
                {adultCount}
              </Font>
              <Button
                className="border-gray"
                style={{ padding: "0px 4px" }}
                size={FontSize.sm}
                onClick={onClickAdultPlus}
              >
                <i class="fas fa-plus"></i>
              </Button>
            </div>
            <div className="flex-row">
              <Font
                size={FontSize.sm}
                boldness={FontBold.light}
                style={{ marginRight: 5 }}
              >
                청소년
              </Font>
              <Button
                className="border-gray"
                size={FontSize.sm}
                style={{ padding: "0px 4px" }}
                onClick={onClickJuvenMinus}
              >
                <i class="fas fa-minus"></i>
              </Button>
              <Font
                size={FontSize.sm}
                boldness={FontBold.light}
                style={{ margin: "0 5px" }}
              >
                {juvenCount}
              </Font>
              <Button
                className="border-gray"
                style={{ padding: "0px 4px" }}
                size={FontSize.sm}
                onClick={onClickJuvenPlus}
              >
                <i class="fas fa-plus"></i>
              </Button>
            </div>
          </div>
        </div>
        {/* 금액란 */}
        <div
          className="flex-row justify-sb border-gray"
          style={{ height: "30%", padding: "10px" }}
        >
          <Font size={FontSize.sm} boldness={FontBold.light}>
            결제금액
          </Font>
          <div className="flex-row" style={{ alignItems: "flex-end" }}>
            <Font
              size={FontSize.xl}
              boldness={FontBold.bold}
              style={{ marginRight: 8 }}
            >
              {loading !== true && totalPrice(adultCount, juvenCount)}
              {loading !== false && <Spinner color="#d8d8d8"></Spinner>}
            </Font>
          </div>
        </div>
      </div>
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
  function totalPrice(adultCount, juvenCount) {
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });

    return formatter.format(
      ticketPrice * adultCount +
        ticketPrice * (1 - juvenDiscountRatio) * juvenCount
    );
  }

  // 성인 청소년 plus minus 버튼 핸들러
  function onClickAdultMinus() {
    if (adultCount > 0) {
      setAdultCount(adultCount - 1);
      setJuvenCount(juvenCount + 1);
    } else {
      alert("수량을 확인해주세요.");
    }
  }
  function onClickAdultPlus() {
    if (adultCount < selectedSeatList.length) {
      setAdultCount(adultCount + 1);
      setJuvenCount(juvenCount - 1);
    } else {
      alert("수량을 확인해주세요.");
    }
  }
  function onClickJuvenMinus() {
    if (juvenCount > 0) {
      setJuvenCount(juvenCount - 1);
      setAdultCount(adultCount + 1);
    } else {
      alert("수량을 확인해주세요.");
    }
  }
  function onClickJuvenPlus() {
    if (juvenCount < selectedSeatList.length) {
      setJuvenCount(juvenCount + 1);
      setAdultCount(adultCount - 1);
    } else {
      alert("수량을 확인해주세요.");
    }
  }

  // 초기화 버튼 핸들러
  function onClickReset() {
    let emptyList = [];
    setSelectedSeatList([...emptyList]);
  }
}

export default SeatInformation;
