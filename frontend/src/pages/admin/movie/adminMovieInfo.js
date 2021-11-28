import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Table } from "../../../components/admin/movie/Table";
import { Button, BgColor } from "src/design-system/button/Button";
import Spinner from "src/components/basic/spinner";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";

const API = window.location.hostname === 'localhost' ? '' : '/api';

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

  console.log(API);

  const getMovie = async () => {
    try {
      const response = await axios.get("/movies/boxoffice");
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

      // 업데이트 할 영화코드 받아오기
      try {
        let i = 1;
        while (1) {
          const toBeUpdatedResponse = await axios.get(API + "/movies/pre?page=" + i);
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
      Header: "영화코드",
    },
    {
      accessor: "movie_name",
      Header: "영화이름",
    },
    {
      accessor: "movie_name_en",
      Header: "영화이름(영)",
    },
    {
      accessor: "reserved_count",
      Header: "예약수",
    },
    {
      accessor: "movie_state",
      Header: "개봉여부",
    },
    {
      accessor: "genre",
      Header: "장르",
    },
    {
      accessor: "synopsis",
      Header: "줄거리",
    },
    {
      accessor: "rating",
      Header: "평점",
    },
    {
      accessor: "running_time",
      Header: "러닝타임",
    },
    {
      accessor: "poster",
      Header: "포스터",
    },
    {
      accessor: "actors",
      Header: "배우",
    },
    {
      accessor: "released_at",
      Header: "개봉일",
    },
    {
      accessor: "director",
      Header: "감독",
    },
    {
      accessor: "trailer",
      Header: "트레일러",
    },
    {
      accessor: "distributor",
      Header: "배급사",
    },
    {
      accessor: "nation",
      Header: "국가",
    },
    {
      accessor: "age_limit",
      Header: "상영등급",
    },
    {
      accessor: "show_type",
      Header: "상영형태",
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
            영화 목록 업데이트
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
            영화 상세정보 업데이트
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
          불러오기
        </Button>
        <Button
          className="refresh-btn"
          size={FontSize.sm}
          color={FontColor.white}
          boldness={FontBold.bold}
          background={BgColor.green}
          onClick={getMovie}
        >
          새로고침
        </Button>
      </div>
      <Table columns={columns} data={data} fetchMovie={getMovie}></Table>
    </>
  );
};

export default AdminMovie;
