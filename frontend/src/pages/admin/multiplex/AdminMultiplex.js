import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { MultiplexTable } from "src/components/admin/multiplex/MultiplexTable";
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

const AdminMultiplex = ({ history }) => {
  const [multiplexList, setMultiplexList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 모든 지점을 받아옴.
  const getMultiplexList = async () => {
    let curPage = 1;
    let multplexListCpy = [];
    while (1) {
      try {
        const response = await axios.get(
          API + "/admin/multiplex/list/" + curPage
        );
        if (response.data.multiplexList.length === 0) {
          break;
        }
        multplexListCpy.push(...response.data.multiplexList);
        curPage = curPage + 1;
      } catch (e) {
        console.log(e);
      }
    }
    setMultiplexList(multplexListCpy);
  };

  useEffect(() => {
    getMultiplexList();
  }, []);

  const columnData = [
    {
      accessor: "multiplex_id",
      Header: "지점코드",
    },
    {
      accessor: "multiplex_name",
      Header: "지점이름",
    },
    {
      accessor: "multiplex_tel",
      Header: "전화번호",
    },
    {
      accessor: "multiplex_address",
      Header: "주소",
    },
    {
      accessor: "multiplex_thumb",
      Header: "사진",
    },
    {
      accessor: "multiplex_special",
      Header: "특별관",
    },
  ];

  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => multiplexList, [multiplexList]);

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
      <MultiplexTable
        history={history}
        columns={columns}
        data={data}
      ></MultiplexTable>
    </>
  );
};

export default AdminMultiplex;
