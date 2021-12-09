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
import MultiplexDetailModal from "./MultiplexDetailModal";
// import Modal from "./Modal";
// import PosterModal from "./PosterModal";

export const MultiplexDetailTable = ({
  history,
  columns,
  data,
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
                    <Font size={FontSize.sm}>
                      {cell.column.id === "total_price" ||
                      cell.column.id === "theater_ticket_price"
                        ? wonFormatter(cell.value)
                        : cell.render("Cell")}
                    </Font>
                  </td>
                ))}
                <td>
                  <Button
                    color={FontColor.white}
                    boldness={FontBold.light}
                    background={BgColor.skyblue}
                    onClick={() => {
                      onClickEdit(row);
                    }}
                  >
                    편집
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <MultiplexDetailModal
        modalState={modalState}
        multiplexId={multiplexId}
        theaterId={theaterId}
        theaterName={theaterName}
        theaterType={theaterType}
        ticketPrice={ticketPrice}
        setModalState={setModalState}
        setTheaterId={setTheaterId}
        setTheaterName={setTheaterName}
        setTheaterType={setTheaterType}
        setTicketPrice={setTicketPrice}
        getMultiplexDetail={getMultiplexDetail}
      ></MultiplexDetailModal>
    </>
  );

  function onClickEdit(row) {
    setModalState("edit");
    setTheaterId(row.cells[1].value);
    setTheaterName(row.cells[2].value);
    setTheaterType(row.cells[3].value);
    setTicketPrice(row.cells[4].value);
  }

  // 화폐 포매터
  function wonFormatter(number) {
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
    return formatter.format(number);
  }
};
