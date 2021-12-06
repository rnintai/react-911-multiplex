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
  modalState,
  setModalState,
  movieId,
  setMovieId,
  synopsis,
  setSynopsis,
  poster,
  setPoster,
  trailer,
  setTrailer,
  fetchMovie,
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
            {movieId}
          </Font>
          <Font
            tag="label"
            size={FontSize.sm}
            boldness={FontBold.bold}
            style={{ marginBottom: "5px" }}
          >
            Synopsis
          </Font>
          <Font
            tag="textarea"
            id="synopsis"
            name="synopsis"
            size={FontSize.sm}
            style={{
              fontFamily: "Noto Sans KR, sans-serif",
              height: "60px",
            }}
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          ></Font>
          <Font
            tag="label"
            size={FontSize.sm}
            boldness={FontBold.bold}
            style={{ marginBottom: "5px" }}
          >
            Poster
          </Font>
          <Font
            tag="input"
            type="text"
            id="poster"
            name="poster"
            size={FontSize.sm}
            style={{
              fontFamily: "Noto Sans KR, sans-serif",
            }}
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          ></Font>
          <div>
            <img
              src={poster}
              alt="포스터"
              width="80px"
              style={{ display: "inline-block", marginRight: "10px" }}
            />
          </div>
          <Font
            tag="label"
            size={FontSize.sm}
            boldness={FontBold.bold}
            style={{ marginBottom: "5px" }}
          >
            Trailer
          </Font>
          <Font
            tag="textarea"
            id="trailer"
            name="trailer"
            size={FontSize.sm}
            style={{
              fontFamily: "Noto Sans KR, sans-serif",
              height: "60px",
            }}
            value={trailer}
            onChange={(e) => setTrailer(e.target.value)}
          ></Font>
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
          color={response.msg === "success" ? FontColor.green : FontColor.red50}
          boldness={FontBold.bold}
          style={{ margin: "10px" }}
        >
          {response.msg}
        </Font>
      </div>
    </div>
  );

  function closeModal() {
    setModalState(false);
    setSynopsis("");
    setPoster("");
    setTrailer("");
    setResponse({});
  }

  async function applyChanges() {
    const response = await axios.put(API + "/movies/detail/" + movieId, {
      synopsis: synopsis,
      poster: poster,
      trailer: trailer,
    });
    setResponse(response.data);
    fetchMovie();
    console.log(response.data);
  }
};

export default Modal;
