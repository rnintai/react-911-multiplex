import React, { useState } from "react";
import axios from "axios";
import { Button, BgColor } from "src/design-system/button/Button";
import "./modal.scss";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

const PosterModal = ({
  movieId,
  poster,
  setPoster,
  posterModalState,
  setPosterModalState,
  fetchMovie,
}) => {
  return (
    <div className={posterModalState ? "modal-wrap show" : "modal-wrap"}>
      <div className="modal-bg" onClick={closeModal}></div>
      <div className="modal-window">
        <form encType="multipart/form-data" style={{ display: "flex" }}>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            name="poster"
            placeholder="업로드"
            onChange={handleFileOnChange}
          ></input>
        </form>
        <img
          src={poster}
          alt={movieId + "포스터"}
          style={{ position: "absolute", width: "200px" }}
        />
      </div>
    </div>
  );

  async function handleFileOnChange(event) {
    const formData = new FormData();
    formData.append("poster", event.target.files[0]);
    await axios
      .post(API + "/movies/detail/poster/" + movieId, formData, {
        header: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
        // setPoster(response.data.image.replace("public\\", ""));
        setPoster(response.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
    await fetchMovie();
  }

  function closeModal() {
    setPosterModalState(false);
    setPoster("");
  }
};

export default PosterModal;
