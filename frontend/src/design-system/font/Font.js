import React from "react";

import "./font.scss";

export const FontSize = {
  default: "ds-font-size--default",
  sm: "ds-font-size--sm",
  lg: "ds-font-size--lg",
  xl: "ds-font-size--xl",
};

export const FontBold = {
  default: "ds-font--default",
  light: "ds-font--light",
  bold: "ds-font--bold",
};

export const FontColor = {
  default: "ds-font-color--default",
  white: "ds-font-color--white",
  red0: "ds-font-color--red0",
  red25: "ds-font-color--red25",
  red50: "ds-font-color--red50",
  red75: "ds-font-color--red75",
  red100: "ds-font-color--red100",
  gray50: "ds-font-color--gray50",
  gray75: "ds-font-color--gray75",
  green: "ds-font-color--green",
};

export const Font = ({
  tag = "span",
  size = FontSize.default,
  boldness = FontBold.default,
  color = FontColor.default,
  className = "",
  children,
  ...rest
}) => {
  const Tag = `${tag}`;
  const classNames = `${
    className === "" ? "" : className + " "
  }ds-font ${size} ${boldness} ${color}`;
  return (
    <Tag className={classNames} {...rest}>
      {children}
    </Tag>
  );
};
