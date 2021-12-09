import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import queryString from "query-string";

import {
  Font,
  FontBold,
  FontColor,
  FontSize,
} from "src/design-system/font/Font";
import Input from "src/components/basic/Input";
import { Button, BgColor } from "src/design-system/button/Button";
import { MultiplexDetailTable } from "src/components/admin/multiplex/MultiplexDetailTable";
import Spinner from "src/components/basic/Spinner";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

function AdminMultiplexDetail() {
  // var
  const id = queryString.parse(useLocation().search).id;
  // 일주일 전
  let initialFromDate = new Date();
  initialFromDate.setDate(initialFromDate.getDate() - 7);
  initialFromDate.setHours(0, 0, 0);
  initialFromDate = toDateString(initialFromDate);
  // 오늘 23:59:59
  let initialToDate = new Date();
  initialToDate.setHours(23, 59, 59);
  initialToDate = toDateString(initialToDate);

  // state
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);
  const [theaterId, setTheaterId] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [theaterType, setTheaterType] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  // 모달 종류
  const [modalState, setModalState] = useState("");
  // initial loading
  const [initLoading, setInitLoading] = useState(true);

  // 조회 trigger
  const [isSearching, setIsSearching] = useState(false);
  // 조회결과
  const [multiplexDetail, setMultiplexDetail] = useState([]);

  async function getMultiplexDetail() {
    const result = await axios.get(
      API + `/admin/multiplex/detail/${id}?from=${fromDate}&to=${toDate}`
    );
    setMultiplexDetail(result.data.multiplexDetail);
    setInitLoading(false);
  }

  useEffect(() => {
    getMultiplexDetail();
    setIsSearching(false);
  }, [isSearching]);

  const columnData = [
    {
      accessor: "multiplex_name",
      Header: "지점이름",
    },
    {
      accessor: "theater_id",
      Header: "상영관코드",
    },
    {
      accessor: "theater_name",
      Header: "상영관이름",
    },
    {
      accessor: "theater_type",
      Header: "상영타입",
    },
    {
      accessor: "theater_ticket_price",
      Header: "티켓가격",
    },
    {
      accessor: "total_price",
      Header: "조회기간 매출액",
    },
  ];
  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => multiplexDetail, [multiplexDetail]);

  return (
    <div
      className="flex-col"
      style={{ width: 1000, margin: "0 auto", position: "relative" }}
    >
      <div className="flex-row justify-sb" style={{ marginBottom: 20 }}>
        <div className="flex-row">
          <div style={{ marginRight: 10 }}>
            <Input
              name="fromDate"
              type="date"
              state={fromDate.split("T")[0]}
              setState={setFromDate}
              labelText="조회시작일"
            ></Input>
          </div>
          <div style={{ marginRight: 10 }}>
            <Input
              name="toDate"
              type="date"
              state={toDate.split("T")[0]}
              setState={setToDate}
              labelText="조회종료일"
            ></Input>
          </div>
          <Button
            color={FontColor.white}
            background={BgColor.green}
            size={FontSize.sm}
            onClick={onClickSearch}
            className={initLoading ? "disabled" : ""}
          >
            조회
          </Button>
          {isSearching && <Spinner></Spinner>}
        </div>
        <Button
          color={FontColor.white}
          background={BgColor.red25}
          size={FontSize.sm}
          onClick={onClickAdd}
          className={initLoading ? "disabled" : ""}
        >
          추가
        </Button>
      </div>
      <MultiplexDetailTable
        columns={columns}
        data={data}
        modalState={modalState}
        multiplexId={id}
        theaterId={theaterId}
        theaterName={theaterName}
        theaterType={theaterType}
        ticketPrice={ticketPrice}
        setModalState={setModalState}
        setTheaterId={setTheaterId}
        setTheaterName={setTheaterName}
        setTheaterType={setTheaterType}
        setTicketPrice={setTicketPrice}
        getMultiplexDetail={getMultiplexDetail}
      ></MultiplexDetailTable>
      <Font style={{ textAlign: "right" }}>
        총 매출액: <strong>{calTotalIncome()}</strong>
        <Font boldness={FontBold.light} style={{ marginLeft: 6 }}>
          ({fromDate.split("T")[0]} ~ {toDate.split("T")[0]})
        </Font>
      </Font>
    </div>
  );
  // 조회버튼 클릭시
  function onClickSearch() {
    setIsSearching(true);
  }

  // 추가 버튼 클릭시
  function onClickAdd() {
    setModalState("add");
    setTheaterId(
      Number(multiplexDetail[multiplexDetail.length - 1].theater_id) + 1 + ""
    );
  }

  // 총액 계산
  function calTotalIncome() {
    let result = 0;
    multiplexDetail.forEach((elem) => {
      result += elem.total_price;
    });
    return wonFormatter(result);
  }

  // 화폐 포매터
  function wonFormatter(number) {
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
    return formatter.format(number);
  }
}

function toDateString(date) {
  let year = date.getFullYear().toString();

  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month.toString() : month.toString();

  let day = date.getDate();
  day = day < 10 ? "0" + day.toString() : day.toString();

  let hour = date.getHours();
  hour = hour < 10 ? "0" + hour.toString() : hour.toString();

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();

  let seconds = date.getSeconds();
  seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  return `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
}

export default AdminMultiplexDetail;
