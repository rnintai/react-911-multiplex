import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Table } from "../../../components/admin/movie/Table";
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

const AdminMovie = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listFetching, setListFetching] = useState(false);
  const [detailFetching, setDetailFetching] = useState(false);
  const [pageLength, setPageLength] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const [moviesLength, setMoviesLength] = useState(0);
  const [curMovieCnt, setCurMovieCnt] = useState(0);

  const getMovie = async () => {
    try {
      const response = await axios.get(API + "/movies/boxoffice");
      setMovieList(response.data.boxOfficeList);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  const fetchMovie = async () => {
    setCurPage(1);
    let toBeUpdated = [];
    setListFetching(true);
    try {
      let response = await axios.get(API + "/movies/list/fetch/1");
      console.log(response.data.totCnt);
      let tmpPageLength =
        response.data.totCnt % 10 !== 0
          ? response.data.totCnt / 10 + 1
          : response.data.totCnt / 10;
      tmpPageLength = parseInt(tmpPageLength);
      setPageLength(tmpPageLength);
      setCurPage(curPage + 1);
      toBeUpdated = [...response.data.updatedMovieCodeList];

      for (let i = 2; i <= tmpPageLength; i++) {
        try {
          let response = await axios.get(API + `/movies/list/fetch/${i}`);
          console.log(response);
          toBeUpdated = [...toBeUpdated, ...response.data.updatedMovieCodeList];
          console.log(toBeUpdated);
          setCurPage(i);
        } catch (e) {
          // setError(e);
          console.log(e);
        }
      }
      setListFetching(false);

      // ???????????? ??? ???????????? ????????????
      try {
        let i = 1;
        while (1) {
          const toBeUpdatedResponse = await axios.get(
            API + "/movies/pre?page=" + i
          );
          const movieCdList = toBeUpdatedResponse.data.movieCdList;
          if (movieCdList.length === 0) {
            break;
          }
          for (let i = 0; i < movieCdList.length; i++) {
            toBeUpdated.push(movieCdList[i].movie_id);
          }
          i = i + 1;
        }
      } catch (e) {
        console.log(e);
      }

      setMoviesLength(toBeUpdated.length);
      setDetailFetching(true);

      for (let i = 0; i < toBeUpdated.length; i++) {
        try {
          await axios.get(API + `/movies/detail/fetch/${toBeUpdated[i]}`);
          setCurMovieCnt(i);
        } catch (e) {
          console.log(e);
        }
      }
      setDetailFetching(false);
    } catch (e) {
      console.log(e);
    }

    // setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  const columnData = [
    {
      accessor: "movie_id",
      Header: "????????????",
    },
    {
      accessor: "movie_name",
      Header: "????????????",
    },
    {
      accessor: "movie_name_en",
      Header: "????????????(???)",
    },
    {
      accessor: "reserved_count",
      Header: "?????????",
    },
    {
      accessor: "movie_state",
      Header: "????????????",
    },
    {
      accessor: "genre",
      Header: "??????",
    },
    {
      accessor: "synopsis",
      Header: "?????????",
    },
    {
      accessor: "rating",
      Header: "??????",
    },
    {
      accessor: "running_time",
      Header: "????????????",
    },
    {
      accessor: "poster",
      Header: "?????????",
    },
    {
      accessor: "actors",
      Header: "??????",
    },
    {
      accessor: "released_at",
      Header: "?????????",
    },
    {
      accessor: "director",
      Header: "??????",
    },
    {
      accessor: "trailer",
      Header: "????????????",
    },
    {
      accessor: "distributor",
      Header: "?????????",
    },
    {
      accessor: "nation",
      Header: "??????",
    },
    {
      accessor: "age_limit",
      Header: "????????????",
    },
    {
      accessor: "show_type",
      Header: "????????????",
    },
  ];

  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => movieList, [movieList]);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        {listFetching && (
          <Font
            size={FontSize.sm}
            boldness={FontBold.bold}
            style={{ marginRight: "5px" }}
          >
            ?????? ?????? ????????????
            <br />
            {curPage + "/" + pageLength}
          </Font>
        )}
        {detailFetching && (
          <Font
            size={FontSize.sm}
            boldness={FontBold.bold}
            style={{ marginRight: "5px" }}
          >
            ?????? ???????????? ????????????
            <br />
            {curMovieCnt + "/" + moviesLength}
          </Font>
        )}
        <Button
          className="fetch-btn"
          size={FontSize.sm}
          color={FontColor.white}
          boldness={FontBold.bold}
          background={BgColor.gray75}
          style={{ marginRight: "5px" }}
          onClick={fetchMovie}
          disabled={listFetching || detailFetching ? true : false}
        >
          ????????????
        </Button>
        <Button
          className="refresh-btn"
          size={FontSize.sm}
          color={FontColor.white}
          boldness={FontBold.bold}
          background={BgColor.green}
          onClick={getMovie}
        >
          ????????????
        </Button>
      </div>
      <Table columns={columns} data={data} fetchMovie={getMovie}></Table>
    </>
  );
};

export default AdminMovie;
