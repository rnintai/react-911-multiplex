import React, { Component, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import {
  Font,
  FontSize,
  FontBold,
  FontColor,
} from "src/design-system/font/Font";

import { Button, BgColor } from "src/design-system/button/Button";
// import Modal from "./Modal";
// import PosterModal from "./PosterModal";

export const MultiplexTable = ({ history, columns, data, fetchMovie }) => {
  // const [modalState, setModalState] = useState(false);
  // const [posterModalState, setPosterModalState] = useState(false);
  // const [movieId, setMovieId] = useState("");
  // const [synopsis, setSynopsis] = useState("");
  // const [poster, setPoster] = useState("");
  // const [trailer, setTrailer] = useState("");

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <table
        {...getTableProps()}
        style={{
          tableLayout: "fixed",
          margin: "30px 20px",
          minHeight: "200px",
          width: "100%",
        }}
      >
        <thead>
          {headerGroups.map((header) => (
            // getHeaderGroupProps를 통해 header 배열을 호출한다
            <tr {...header.getHeaderGroupProps()}>
              {header.headers.map((col) => (
                // getHeaderProps는 각 셀 순서에 맞게 header를 호출한다
                <th
                  {...col.getHeaderProps()}
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Font size={FontSize.sm}>{col.render("Header")}</Font>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              // getRowProps는 각 row data를 호출해낸다
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  // getCellProps는 각 cell data를 호출해낸다
                  <td
                    {...cell.getCellProps()}
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      width: "50%",
                      textAlign: "center",
                    }}
                    title={cell.value}
                  >
                    <Font size={FontSize.sm}>{cell.render("Cell")}</Font>
                  </td>
                ))}
                <td>
                  <Button
                    color={FontColor.white}
                    boldness={FontBold.light}
                    background={BgColor.green}
                    onClick={() => {
                      onClickDetail(row);
                    }}
                  >
                    상세
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  function onClickDetail(row) {
    history.push("./multiplex/detail?id=" + row.values.multiplex_id);
  }
};
