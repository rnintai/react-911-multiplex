import React, { useState, useEffect } from "react";
import Spinner from "../basic/Spinner";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

function SeatSection({
  loading,
  reservedSeatList,
  selectedSeatList,
  setSelectedSeatList,
}) {
  return (
    //
    <div
      className="border-gray"
      style={{
        width: "65%",
        height: 500,
        marginRight: 10,
        position: "relative",
      }}
    >
      {loading !== true && reservedSeatList.length !== 0 && (
        <>
          <Font
            tag="div"
            color={FontColor.white}
            size={FontSize.lg}
            boldness={FontBold.bold}
            className="screen-box"
          >
            SCREEN
          </Font>
          <div className="seat-wrap flex-col">
            {reservedSeatList.map((rowList, rowIdx) => {
              return (
                <>
                  <div
                    className="seat-row flex-row justify-center"
                    key={rowIdx}
                  >
                    <div className="flex-col" style={{ alignItems: "center" }}>
                      {rowIdx === 0 && <div style={{ height: 20 }}></div>}
                      <Font
                        tag="div"
                        boldness={FontBold.light}
                        color={FontColor.gray75}
                        size={FontSize.sm}
                        style={{
                          width: 5,
                          marginRight: 10,
                          justifyContent: "center",
                        }}
                        key={parseIndexToRow(rowIdx)}
                      >
                        {parseIndexToRow(rowIdx)}
                      </Font>
                    </div>
                    {rowList.map((col, colIdx) => (
                      <div className="flex-col" key={rowIdx + "" + colIdx}>
                        {rowIdx === 0 && (
                          <Font
                            tag="div"
                            boldness={FontBold.light}
                            color={FontColor.gray75}
                            size={FontSize.sm}
                            style={{
                              width: 15,
                              margin: "0 4px 5px 4px",
                              textAlign: "center",
                            }}
                            key={parseIndexToCol(colIdx)}
                          >
                            {parseIndexToCol(colIdx)}
                          </Font>
                        )}
                        <div
                          className={selectedSeatClass(col, rowIdx, colIdx)}
                          onClick={() => {
                            let seat =
                              parseIndexToRow(rowIdx) + parseIndexToCol(colIdx);
                            onClickSeat(seat);
                          }}
                          key={
                            parseIndexToRow(rowIdx) + parseIndexToCol(colIdx)
                          }
                        ></div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      {loading === true && <Spinner color="#d8d8d8"></Spinner>}
    </div>
  );

  // 클릭 핸들러
  function onClickSeat(seat) {
    let selectedSeatListCpy = selectedSeatList;
    // seat이 선택된 좌석 목록에 없으면 추가
    if (selectedSeatList.indexOf(seat) === -1) {
      selectedSeatListCpy.push(seat);
    } else {
      selectedSeatListCpy = selectedSeatListCpy.filter((elem) => elem !== seat);
    }
    setSelectedSeatList([...selectedSeatListCpy]);
  }

  // 선택된 좌석 표시용 함수
  function selectedSeatClass(isVacant, rowIdx, colIdx) {
    let result = "seat";
    if (isVacant === false) {
      result += " disabled";
    }
    let seatName = parseIndexToRow(rowIdx) + parseIndexToCol(colIdx);
    let filterList = selectedSeatList.filter((elem) => elem === seatName);
    if (filterList.length !== 0) {
      result += " selected";
    }
    return result;
  }

  function parseIndexToRow(idx) {
    const ascii = idx + "A".charCodeAt();
    return String.fromCharCode(ascii);
  }
  function parseIndexToCol(idx) {
    let col = idx + 1;
    return col < 10 ? "0" + col : "" + col;
  }
}

export default SeatSection;
