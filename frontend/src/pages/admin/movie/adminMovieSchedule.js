import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!
// import { Table } from "../../../components/admin/movie/Table";
import AddScheduleModal from "src/components/admin/tickets/addScheduleModal";
import { Button, BgColor } from "src/design-system/button/Button";
import {
  Font,
  FontSize,
  FontColor,
  FontBold,
} from "src/design-system/font/Font";
import Input from "src/components/basic/input";
import MultiplexSelect from "src/components/admin/tickets/multiplexSelect";
import TheaterSelect from "src/components/admin/tickets/theaterSelect";
import "src/App.css";

const API = window.location.hostname === 'localhost' ? '' : '/api';

const AdminMovieSchedule = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [filteredScheduleList, setFilteredScheduleList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [movieCd, setMovieCd] = useState("");
  const [multiplex, setMultiplex] = useState("");
  const [theater, setTheater] = useState("");
  const [addModalState, setAddModalState] = useState(false);
  const [removeState, setRemoveState] = useState(false);

  const [multiplexList, setMultiplexList] = useState([]);
  const [multiplexOption, setMultiplexOption] = useState("0");

  const [theaterList, setTheaterList] = useState([]);
  const [theaterOption, setTheaterOption] = useState("0");

  const [filteredTheaterList, setFilteredTheaterList] = useState([]);

  const getSchedule = async () => {
    let curPage = 1;
    while (1) {
      try {
        const response = await axios.get(API + "/admin/tickets/schedule/" + curPage);
        if (response.data.scheduleList.length === 0) {
          break;
        }
        setScheduleList([...scheduleList, ...response.data.scheduleList]);
        curPage = curPage + 1;
      } catch (e) {
        setError(e);
      }
    }
    setLoading(false);
  };
  // 모든 지점을 받아옴.
  const getMultiplexList = async () => {
    let curPage = 1;
    while (1) {
      try {
        const response = await axios.get(API + "/admin/multiplex/list/" + curPage);
        if (response.data.multiplexList.length === 0) {
          break;
        }
        setMultiplexList([...multiplexList, ...response.data.multiplexList]);
        curPage = curPage + 1;
      } catch (e) {
        console.log(e);
      }
    }
  };
  const getTheaterList = async () => {
    let curPage = 1;
    while (1) {
      try {
        const response = await axios.get(API + "/admin/theater/list/" + curPage);
        if (response.data.theaterList.length === 0) {
          break;
        }
        setTheaterList([...theaterList, ...response.data.theaterList]);
        curPage = curPage + 1;
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getSchedule();
    getMultiplexList();
    getTheaterList();
  }, []);

  let events = filteredScheduleList.map((s) => {
    // let start = s.movie_schedule_start.substring(
    //   0,
    //   s.movie_schedule_start.indexOf("+")
    // );
    return {
      title: `${s.movie_name} | ${s.multiplex_name} | ${s.theater_name}`,
      id: s.movie_schedule_id,
      // title: s.movie_name,
      start: s.movie_schedule_start,
      end: s.movie_schedule_end,
    };
  });

  let multiplexObj = multiplexList.map((m) => {
    return {
      id: m.multiplex_id,
      name: m.multiplex_name,
    };
  });
  let theaterObj = filteredTheaterList.map((m) => {
    return {
      id: m.theater_id,
      name: m.theater_name,
    };
  });

  return (
    <>
      <AddScheduleModal
        modalState={addModalState}
        setModalState={setAddModalState}
        removeState={removeState}
        setRemoveState={setRemoveState}
        scheduleId={scheduleId}
        setScheduleId={setScheduleId}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        multiplex={multiplex}
        setMultiplex={setMultiplex}
        theater={theater}
        setTheater={setTheater}
        movieCd={movieCd}
        setMovieCd={setMovieCd}
        getSchedule={getSchedule}
        // scheduleList={scheduleList}
        // setFilteredScheduleList={setFilteredScheduleList}
      ></AddScheduleModal>
      <section
        style={{
          width: "1500px",
          left: "50%",
          position: "relative",
          transform: "translateX(-50%)",
        }}
      >
        <div className="flex-row" style={{ width: "140px" }}>
          <MultiplexSelect
            name="multiplex-select"
            type="select"
            state={multiplexOption}
            setState={setMultiplexOption}
            theaterList={theaterList}
            setTheaterList={setTheaterList}
            setFilteredTheaterList={setFilteredTheaterList}
            width="60px"
            height="20px"
            labelText="지점"
            options={multiplexObj}
          ></MultiplexSelect>
          <TheaterSelect
            name="theater-select"
            type="select"
            state={theaterOption}
            setState={setTheaterOption}
            width="60px"
            height="20px"
            labelText="상영관"
            options={theaterObj}
            scheduleList={scheduleList}
            setFilteredScheduleList={setFilteredScheduleList}
          ></TheaterSelect>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{ center: "timeGridWeek,dayGridMonth" }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        ></FullCalendar>
      </section>
    </>
  );
  function handleDateClick(arg) {
    console.log(substringOfDate(arg.dateStr));
    setStartTime(substringOfDate(arg.dateStr));
    setEndTime(substringOfDate(arg.dateStr));
    setMultiplex(multiplexOption);
    setTheater(theaterOption);
    setAddModalState(true);
  }
  async function handleEventClick(arg) {
    let scheduleResponse = await axios.get(
      "/admin/tickets/schedule/id/" + arg.event.id
    );
    setScheduleId(arg.event.id);
    setStartTime(substringOfDate(arg.event.startStr));
    setEndTime(substringOfDate(arg.event.endStr));
    setMultiplex(scheduleResponse.data.scheduleInfo.multiplex_id);
    setTheater(scheduleResponse.data.scheduleInfo.theater_id);
    setMovieCd(scheduleResponse.data.scheduleInfo.movie_id);
    setAddModalState(true);
    setRemoveState(true);
  }

  function substringOfDate(orgDate) {
    if(orgDate.indexOf("+") !== -1){
      return orgDate.substring(0, orgDate.indexOf("+"));
    } else{
      return orgDate+"T00:00:00";
    }
  }
};

export default AdminMovieSchedule;
