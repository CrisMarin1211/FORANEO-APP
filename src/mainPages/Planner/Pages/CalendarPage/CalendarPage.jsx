import React, { useEffect } from "react";
import "./CalendarPage.css";
import Menu from "../../components/navBar/navBar";
import Calendar from "../../components/calendar/calendar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCalendarEventsFromFirestore } from "../../../../services/calendarFirebase";
import { setCalendarEvents } from "../../../../redux/planner/calendarSlice";
import ToDoButton from "../../components/toDoButton/toDoButton";

const CalendarPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadEvents() {
      const events = await getCalendarEventsFromFirestore();
      dispatch(setCalendarEvents(events));
    }
    loadEvents();
  }, [dispatch]);


  return (
    <>
      <Menu />
    <section className="toDoButton-Container">
      <ToDoButton />
      </section>
      <Calendar />
    </>
  );
};

export default CalendarPage;
