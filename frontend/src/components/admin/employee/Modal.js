import React, { useState } from "react";
import axios from "axios";
import {
  Font,
  FontSize,
  FontBold,
  FontColor,
} from "src/design-system/font/Font";
import { Button, BgColor } from "src/design-system/button/Button";
import "./modal.scss";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

const Modal = ({
  getEmployeeList,
  modalState,
  setModalState,
  employeeId,
  memberId,
  department,
  setDepartment,
  position,
  setPosition,
  wage,
  setWage,
  employmentDate,
  multiplex,
  setMultiplex,
  workTime,
  setWorkTime,
}) => {
  const [response, setResponse] = useState({});
  return (
    <div className={modalState ? "modal-wrap show" : "modal-wrap"}>
      <div className="modal-bg" onClick={closeModal}></div>
      <div className="modal-window">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
          }}
        >
          <Font
            size={FontSize.lg}
            boldness={FontBold.bold}
            style={{ marginBottom: "10px" }}
          >
            {employeeId}
          </Font>
          <div className="flex-row justify-sb">
            <div className="flex-col">
              <Font
                tag="label"
                size={FontSize.sm}
                boldness={FontBold.bold}
                style={{ marginBottom: "5px" }}
              >
                부서
              </Font>
              <Font
                tag="input"
                type="text"
                id="department"
                name="department"
                size={FontSize.sm}
                style={{
                  fontFamily: "Noto Sans KR, sans-serif",
                  height: "20px",
                }}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              ></Font>
            </div>
            <div className="flex-col">
              <Font
                tag="label"
                size={FontSize.sm}
                boldness={FontBold.bold}
                style={{ marginBottom: "5px" }}
              >
                직위
              </Font>
              <Font
                tag="input"
                type="text"
                id="position"
                name="position"
                size={FontSize.sm}
                style={{
                  fontFamily: "Noto Sans KR, sans-serif",
                  height: "20px",
                }}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              ></Font>
            </div>
            <div className="flex-col">
              <Font
                tag="label"
                size={FontSize.sm}
                boldness={FontBold.bold}
                style={{ marginBottom: "5px" }}
              >
                급여
              </Font>
              <Font
                tag="input"
                type="text"
                id="wage"
                name="wage"
                size={FontSize.sm}
                style={{
                  fontFamily: "Noto Sans KR, sans-serif",
                  height: "20px",
                }}
                value={wage}
                onChange={(e) => setWage(e.target.value)}
              ></Font>
            </div>
          </div>
          <div className="flex-row justify-sb">
            <div className="flex-col">
              <Font
                tag="label"
                size={FontSize.sm}
                boldness={FontBold.bold}
                style={{ marginBottom: "5px" }}
              >
                지점명
              </Font>
              <Font
                tag="input"
                type="text"
                id="multiplex"
                name="multiplex"
                size={FontSize.sm}
                style={{
                  fontFamily: "Noto Sans KR, sans-serif",
                  height: "20px",
                }}
                value={multiplex}
                onChange={(e) => setMultiplex(e.target.value)}
              ></Font>
            </div>
            <div className="flex-col">
              <Font
                tag="label"
                size={FontSize.sm}
                boldness={FontBold.bold}
                style={{ marginBottom: "5px" }}
              >
                근무시간
              </Font>
              <Font
                tag="input"
                type="text"
                id="workTime"
                name="workTime"
                size={FontSize.sm}
                style={{
                  fontFamily: "Noto Sans KR, sans-serif",
                  height: "20px",
                }}
                value={workTime}
                onChange={(e) => setWorkTime(e.target.value)}
              ></Font>
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
        <Font
          className="complete-msg"
          size={FontSize.sm}
          color={response.success === true ? FontColor.green : FontColor.red50}
          boldness={FontBold.bold}
          style={{ margin: "10px" }}
        >
          {response.success === true && "success"}
        </Font>
      </div>
    </div>
  );

  function closeModal() {
    setModalState(false);
    setDepartment("");
    setPosition("");
    setWage("");
    setMultiplex("");
    setWorkTime("");
    setResponse({});
  }

  async function applyChanges() {
    const response = await axios.post(API + "/admin/employee", {
      employeeId,
      memberId,
      department,
      position,
      wage,
      employmentDate,
      multiplex,
      // workTime,
    });
    setResponse(response.data);
    getEmployeeList();
    closeModal();
  }
};

export default Modal;
