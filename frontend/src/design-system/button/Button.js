import React from "react";

import "./button.scss";
import { FontSize, FontBold, FontColor } from "../font/Font";

export const BgColor = {
  default: "ds-btn-bg--default",
  white: "ds-btn-bg--white",
  red0: "ds-btn-bg--red0",
  red25: "ds-btn-bg--red25",
  red50: "ds-btn-bg--red50",
  red75: "ds-btn-bg--red75",
  red100: "ds-btn-bg--red100",
  gray50: "ds-btn-bg--gray50",
  gray75: "ds-btn-bg--gray75",
  green: "ds-btn-bg--green",
  skyblue: "ds-btn-bg--skyblue",
};

export const Button = ({
  size = FontSize.default,
  boldness = FontBold.default,
  color = FontColor.default,
  background = BgColor.default,
  className = "",
  children,
  ...rest
}) => {
  const classNames = `${
    className === "" ? "" : className + " "
  }ds-font ${size} ${boldness} ${color} ds-btn ${background}`;
  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};
