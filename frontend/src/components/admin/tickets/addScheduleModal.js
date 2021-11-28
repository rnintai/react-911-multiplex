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
import Input from "src/components/basic/input";

import "../movie/modal.scss";
import "src/App.css";
import "./addScheduleModal.scss";

const API = window.location.hostname === 'localhost' ? '' : '/api';

const AddScheduleModal = ({
  scheduleId,
  setScheduleId,
  multiplex,
  setMultiplex,
  theater,
  setTheater,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  modalState,
  setModalState,
  removeState,
  setRemoveState,
  movieCd,
  setMovieCd,
  getSchedule,
  // scheduleList,
  // setFilteredScheduleList,
}) => {
  const [response, setResponse] = useState({});
  return (
    <div className={modalState ? "modal-wrap show" : "modal-wrap"}>
      <div className="modal-bg" onClick={closeModal}></div>
      <div className="modal-window">
        <div
          className="flex-col"
          style={{
            margin: "10px",
          }}
        >
          <div className="flex-row">
            <div className="row-1_2">
              <Input
                name="start-time"
                type="datetime-local"
                state={startTime}
                setState={setStartTime}
                height="20px"
                labelText="시작시간"
              ></Input>
            </div>
            <div className="row-1_2">
              <Input
                name="end-time"
                type="datetime-local"
                state={endTime}
                setState={setEndTime}
                height="20px"
                labelText="종료시간"
              ></Input>
            </div>
          </div>
          <div className="flex-row">
            <div className="row-1_2">
              <Input
                name="multiplex"
                type="text"
                state={multiplex}
                setState={setMultiplex}
                height="20px"
                labelText="지점코드"
              ></Input>
            </div>
            <div className="row-1_2">
              <Input
                name="theater"
                type="text"
                state={theater}
                setState={setTheater}
                height="20px"
                labelText="상영관코드"
              ></Input>
            </div>
          </div>
          <div className="flex-row">
            <div className="row-1_2">
              <Input
                name="movieCd"
                type="text"
                state={movieCd}
                setState={setMovieCd}
                height="20px"
                labelText="영화코드"
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
        {removeState && (
          <Button
            className="apply-btn"
            size={FontSize.sm}
            color={FontColor.white}
            boldness={FontBold.bold}
            background={BgColor.gray75}
            style={{ margin: "10px" }}
            onClick={removeSchedule}
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
    setModalState(false);
    setScheduleId("");
    setStartTime("");
    setEndTime("");
    setMultiplex("");
    setTheater("");
    setMovieCd("");
    setRemoveState(false);
    setResponse({});
  }

  async function applyChanges() {
    // YYMMDDHH(startTime) + theaterId + movieCd
    let generatedId = startTime
      .substring(2, startTime.indexOf(":"))
      .replaceAll("-", "")
      .replace("T", "");
    // YYMMDDHH
    generatedId += theater + movieCd;

    if (scheduleId !== "" && generatedId !== scheduleId) {
      await axios.post(API + "/admin/tickets/schedule/delete/" + scheduleId);
    }
    const response = await axios.post(API + "/admin/tickets/schedule", {
      scheduleId: generatedId,
      multiplex,
      theater,
      startTime,
      endTime,
      movieCd,
    });
    setResponse(response.data);
    getSchedule();
    // refreshSchedule(theater);
  }

  async function removeSchedule() {
    await axios.post(API + "/admin/tickets/schedule/delete/" + scheduleId);
    closeModal();
    getSchedule();
  }

  // function refreshSchedule(id) {
  //   const result = scheduleList.filter((v) => v.theater_id === id);
  //   setFilteredScheduleList(result);
  // }
};

export default AddScheduleModal;