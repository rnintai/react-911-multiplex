import React from "react";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

const Input = ({ name, type, state, setState, labelText, height, options }) => {
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
      {type === "textarea" && (
        <Font
          tag="textarea"
          id={name}
          name={name}
          size={FontSize.sm}
          style={{
            fontFamily: "Noto Sans KR, sans-serif",
            height,
          }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        ></Font>
      )}
      {type === "select" && (
        <Font
          tag="select"
          id={name}
          name={name}
          size={FontSize.sm}
          style={{
            fontFamily: "Noto Sans KR, sans-serif",
            height,
          }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          {options.map((option) => (
            <option value={option.key}>{option.value}</option>
          ))}
        </Font>
      )}
      {type !== "textarea" && type !== "select" && (
        <Font
          tag="input"
          type={type}
          id={name}
          name={name}
          size={FontSize.sm}
          style={{
            fontFamily: "Noto Sans KR, sans-serif",
            height,
          }}
          value={state}
          onChange={(e) => setState(e.target.value)}
        ></Font>
      )}
    </div>
  );
};
export default Input;
