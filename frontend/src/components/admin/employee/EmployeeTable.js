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
import Modal from "./EditEmployeeModal";
// import PosterModal from "./PosterModal";

export const EmployeeTable = ({ history, columns, data, getEmployeeList }) => {
  const [modalState, setModalState] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [multiplex, setMultiplex] = useState("");
  const [workTime, setWorkTime] = useState("");

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <table
        {...getTableProps()}
        style={{
          tableLayout: "fixed",
          margin: "30px 20px",
          height: "400px",
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
                  <>
                    {cell.column.id === "employee_id" && (
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
                        <Font
                          size={FontSize.sm}
                          onClick={() => {
                            editModal(row);
                          }}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {cell.render("Cell")}
                        </Font>
                      </td>
                    )}
                    {cell.column.id !== "employee_id" && (
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
                    )}
                  </>
                ))}
                {/* <td>
                  <Button
                    color={FontColor.white}
                    boldness={FontBold.light}
                    background={BgColor.green}
                    onClick={() => {
                      editModal(row);
                    }}
                  >
                    편집
                  </Button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        getEmployeeList={getEmployeeList}
        modalState={modalState}
        setModalState={setModalState}
        employeeId={employeeId}
        memberId={memberId}
        department={department}
        setDepartment={setDepartment}
        position={position}
        setPosition={setPosition}
        wage={wage}
        setWage={setWage}
        employmentDate={employmentDate}
        multiplex={multiplex}
        setMultiplex={setMultiplex}
        workTime={workTime}
        setWorkTime={setWorkTime}
      ></Modal>
    </>
  );

  function editModal(row) {
    setModalState(true);
    setEmployeeId(row.cells[0].value);
    setMemberId(row.cells[1].value);
    setDepartment(row.cells[2].value);
    setPosition(row.cells[3].value);
    setWage(row.cells[4].value);
    setEmploymentDate(row.cells[5].value);
    setMultiplex(row.cells[6].value);
    setWorkTime(row.cells[7].value || "");
  }
};
