import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Font,
  FontSize,
  FontBold,
  FontColor,
} from "src/design-system/font/Font";

function MyReservation({ userId }) {
  return (
    <>
      {userId === "" && <Font>조회할 예매번호</Font>}
      {userId !== "" && <Font>{userId}님의 예매내역</Font>}
    </>
  );
}

export default MyReservation;
