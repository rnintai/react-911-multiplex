import React from "react";
import axios from "axios";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

const MultiplexSelect = ({
  name,
  type,
  state,
  setState,
  theaterList,
  setTheaterList,
  setFilteredTheaterList,
  labelText,
  width,
  height,
  options,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Font
        tag="label"
        htmlFor={name}
        size={FontSize.sm}
        boldness={FontBold.bold}
        style={{ marginBottom: "5px" }}
      >
        {labelText}
      </Font>
      <Font
        tag="select"
        id={name}
        name={name}
        size={FontSize.sm}
        style={{
          fontFamily: "Noto Sans KR, sans-serif",
          width,
          height,
        }}
        value={state}
        onChange={async (e) => {
          setState(e.target.value);
          filterTheater(e.target.value);
        }}
      >
        <option value="0">--선택--</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Font>
    </div>
  );

  function filterTheater(id) {
    const result = theaterList.filter((v) => v.multiplex_id === id);
    setFilteredTheaterList(result);
  }
};

export default MultiplexSelect;
