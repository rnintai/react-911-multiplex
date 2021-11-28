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

const AdminMovieSchedule = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [movieCd, setMovieCd] = useState("");
  const [multiplex, setMultiplex] = useState("");
  const [theater, setTheater] = useState("");
  const [addModalState, setAddModalState] = useState(false);

  const getSchedule = async () => {
    let curPage = 1;
    while (1) {
      try {
        const response = await axios.get("/admin/tickets/schedule/" + curPage);
        if (response.data.scheduleList.length === 0) {
          break;
        }
        setScheduleList(response.data.scheduleList);
        curPage = curPage + 1;
      } catch (e) {
        setError(e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getSchedule();
  }, []);

  let events = scheduleList.map((s) => {
    // let start = s.movie_schedule_start.substring(
    //   0,
    //   s.movie_schedule_start.indexOf("+")
    // );
    return {
      // title: `${s.movie_name} | ${s.multiplex_name} | ${s.theater_name}`,
      id: s.movie_schedule_id,
      title: s.movie_name,
      start: s.movie_schedule_start,
      end: s.movie_schedule_end,
    };
  });

  return (
    <>
      <AddScheduleModal
        modalState={addModalState}
        setModalState={setAddModalState}
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
      ></AddScheduleModal>
      <section
        style={{
          width: "1500px",
          left: "50%",
          position: "relative",
          transform: "translateX(-50%)",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            // center: "dayGridMonth,timeGridWeek",
            center: "timeGridWeek",
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        ></FullCalendar>
      </section>
    </>
  );
  function handleDateClick(arg) {
    setStartTime(substringOfDate(arg.dateStr));
    setEndTime(substringOfDate(arg.dateStr));
    setAddModalState(true);
  }
  async function handleEventClick(arg) {
    console.log(arg);
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
  }

  function substringOfDate(orgDate) {
    return orgDate.substring(0, orgDate.indexOf("+"));
  }
};

export default AdminMovieSchedule;
