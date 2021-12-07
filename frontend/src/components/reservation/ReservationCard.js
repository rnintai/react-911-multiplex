import React, { useState, useEffect } from "react";
import {
  FontSize,
  Font,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";
import RatingMark from "../admin/movie/RatingMark";

function ReservationSection({
  poster,
  reservationCode,
  rate,
  movieNm,
  theaterType,
  multiplexNm,
  theaterNm,
  startTm,
  endTm,
  seat,
  totalPrice,
}) {
  return (
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
        <div className="flex-row" style={{ marginTop: 8 }}>
          <Font
            size={FontSize.default}
            boldness={FontBold.light}
            style={{ marginRight: 4 }}
          >
            결제금액:
          </Font>
          <Font size={FontSize.default} boldness={FontBold.bold}>
            {totalPrice}
          </Font>
        </div>
      </div>
    </div>
  );
}

export default ReservationSection;
