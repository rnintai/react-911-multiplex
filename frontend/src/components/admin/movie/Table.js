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
import Modal from "./Modal";
import PosterModal from "./PosterModal";

export const Table = ({ columns, data, fetchMovie }) => {
  const [modalState, setModalState] = useState(false);
  const [posterModalState, setPosterModalState] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [poster, setPoster] = useState("");
  const [trailer, setTrailer] = useState("");

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <table
        {...getTableProps()}
        style={{
          tableLayout: "fixed",
          margin: "30px 20px",
          minHeight: "400px",
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
                    }}
                    title={cell.value}
                  >
                    {cell.column.id === "poster" && (
                      <>
                        <button onClick={() => clickPoster(row)}>
                          <img
                            src={cell.value}
                            style={{ width: "80px" }}
                            alt=" "
                          ></img>
                        </button>
                      </>
                    )}
                    {cell.column.id !== "poster" && (
                      <Font size={FontSize.sm}>{cell.render("Cell")}</Font>
                    )}
                  </td>
                ))}
                <td>
                  <Button
                    className="close-btn"
                    size={FontSize.sm}
                    color={FontColor.white}
                    boldness={FontBold.bold}
                    background={BgColor.skyblue}
                    onClick={() => {
                      editModal(row);
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
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        movieId={movieId}
        setMovieId={setMovieId}
        synopsis={synopsis}
        setSynopsis={setSynopsis}
        poster={poster}
        setPoster={setPoster}
        trailer={trailer}
        setTrailer={setTrailer}
        fetchMovie={fetchMovie}
      ></Modal>
      <PosterModal
        movieId={movieId}
        poster={poster}
        setPoster={setPoster}
        posterModalState={posterModalState}
        setPosterModalState={setPosterModalState}
        fetchMovie={fetchMovie}
      ></PosterModal>
    </>
  );

  function editModal(row) {
    setModalState(true);
    setMovieId(row.cells[0].value);
    setSynopsis(row.cells[6].value);
    setPoster(row.cells[9].value);
    setTrailer(row.cells[13].value);
  }

  function clickPoster(row) {
    setMovieId(row.cells[0].value);
    setPoster(row.cells[9].value);
    setPosterModalState(true);
  }
};
