import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { EmployeeTable } from "src/components/admin/employee/EmployeeTable";
import { Button, BgColor } from "src/design-system/button/Button";
import Spinner from "src/components/basic/Spinner";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

const API =
  window.location.hostname === "localhost" ? "http://localhost:5000" : "/api";

const Employee = ({ history }) => {
  const [employeeList, setEmployeeList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 모든 지점을 받아옴.
  const getEmployeeList = async () => {
    let curPage = 1;
    let employeeListCpy = [];
    while (1) {
      try {
        const response = await axios.get(API + "/admin/employee/" + curPage);
        if (response.data.employeeList.length === 0) {
          break;
        }
        employeeListCpy.push(...response.data.employeeList);
        curPage = curPage + 1;
      } catch (e) {
        console.log(e);
      }
    }
    setEmployeeList(employeeListCpy);
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const columnData = [
    {
      accessor: "employee_id",
      Header: "사번",
    },
    {
      accessor: "member_id",
      Header: "아이디",
    },
    {
      accessor: "department",
      Header: "부서",
    },
    {
      accessor: "position",
      Header: "직위",
    },
    {
      accessor: "wage",
      Header: "급여",
    },
    {
      accessor: "employment_date",
      Header: "입사일",
    },
    {
      accessor: "multiplex_name",
      Header: "지점명",
    },
    {
      accessor: "time",
      Header: "근무시간",
    },
  ];

  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => employeeList, [employeeList]);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      ></div>
      <EmployeeTable
        history={history}
        columns={columns}
        data={data}
        getEmployeeList={getEmployeeList}
      ></EmployeeTable>
    </>
  );
};

export default Employee;
