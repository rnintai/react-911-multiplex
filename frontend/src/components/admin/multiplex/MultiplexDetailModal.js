import React, { useState, useEffect } from "react";
import axios from "axios";

// import { Table } from "../../../components/admin/movie/Table";
import { Button, BgColor } from "src/design-system/button/Button";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";
import Input from "src/components/basic/Input";

import "../movie/modal.scss";
import "src/App.css";
// import "./addScheduleModal.scss";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

const MultiplexDetailModal = ({
  modalState,
  multiplexId,
  theaterId,
  theaterName,
  theaterType,
  ticketPrice,
  setModalState,
  setTheaterId,
  setTheaterName,
  setTheaterType,
  setTicketPrice,
  getMultiplexDetail,
}) => {
  const [response, setResponse] = useState({});
  return (
    <div className={modalState !== "" ? "modal-wrap show" : "modal-wrap"}>
      <div className="modal-bg" onClick={closeModal}></div>
      <div className="modal-window">
        <div
          className="flex-col"
          style={{
            margin: "10px",
          }}
        >
          <div className="flex-row justify-sb">
            <div className="row-1_2">
              <Input
                name="theaterId"
                type="text"
                state={theaterId}
                setState={setTheaterId}
                height="20px"
                labelText="상영관코드"
                disabled
              ></Input>
            </div>
            <div className="row-1_2">
              <Input
                name="theaterName"
                type="text"
                state={theaterName}
                setState={setTheaterName}
                height="20px"
                labelText="상영관이름"
              ></Input>
            </div>
          </div>
          <div className="flex-row justify-sb">
            <div className="row-1_2">
              <Input
                name="theaterType"
                type="text"
                state={theaterType}
                setState={setTheaterType}
                height="20px"
                labelText="상영관타입"
              ></Input>
            </div>
            <div className="row-1_2">
              <Input
                name="ticketPrice"
                type="text"
                state={ticketPrice}
                setState={setTicketPrice}
                height="20px"
                labelText="티켓가격"
              ></Input>
            </div>
          </div>
        </div>
        <Button
          className="apply-btn"
          size={FontSize.sm}
          color={FontColor.white}
          boldness={FontBold.bold}
          background={BgColor.skyblue}
          style={{ margin: "10px" }}
          onClick={applyChanges}
        >
          적용
        </Button>
        <Button
          className="close-btn"
          size={FontSize.sm}
          color={FontColor.white}
          boldness={FontBold.bold}
          background={BgColor.red25}
          onClick={closeModal}
        >
          닫기
        </Button>
        {modalState === "edit" && (
          <Button
            className="apply-btn"
            size={FontSize.sm}
            color={FontColor.white}
            boldness={FontBold.bold}
            background={BgColor.gray75}
            style={{ margin: "10px", float: "right" }}
            onClick={removeTheater}
          >
            삭제
          </Button>
        )}
        <Font
          className="complete-msg"
          size={FontSize.sm}
          color={response.success === true ? FontColor.green : FontColor.red50}
          boldness={FontBold.bold}
          style={{ margin: "10px" }}
        >
          {response.success === true && "성공"}
          {response.success === false && "실패"}
        </Font>
      </div>
    </div>
  );
  function closeModal() {
    setModalState("");
    setTheaterId("");
    setTheaterName("");
    setTheaterType("");
    setTicketPrice(0);
    setResponse({});
  }

  async function applyChanges() {
    const response = await axios.post(API + "/admin/theater", {
      theaterId,
      multiplexId,
      theaterName,
      theaterType,
      ticketPrice,
    });
    getMultiplexDetail();

    setResponse(response);
    closeModal();
  }

  async function removeTheater() {
    await axios.delete(API + "/admin/theater/" + theaterId);
    closeModal();
    getMultiplexDetail();
  }
};

export default MultiplexDetailModal;
