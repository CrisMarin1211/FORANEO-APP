import React, { useEffect, useState } from "react";
import "./EmotionTracker.css";
import Menu from "../../components/navBar/navBar";
import ListEmotions from "../../components/listEmotions/listEmotions";
import {
  emotionsData,
  hobbiesData,
  peopleData,
  weatherData,
  healthData,
  eventsData,
} from "../../data/iconsData";
import ModalSaveEmotions from "../../components/modalSaveEmotions/modalSaveEmotions";
import DayFeedbackCard from "../../components/dayFeedbackCard/dayFeedbackCard";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setEmotionsForDate } from "../../../../redux/planner/emotionsSlice";
import { saveCalendarEventToFirestore } from "../../../../services/calendarFirebase.js";
import { setCalendarEvents } from "../../../../redux/planner/calendarSlice";

const EmotionTracker = () => {
  const [allSelections, setAllSelections] = useState({});
  const [dayMood, setDayMood] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const calendarEvents = useSelector((state) => state.calendar.events);

  useEffect(() => {
    const incomingDate = location.state?.selectedDate;
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(incomingDate || today);

    // Restringir días futuros
    if (incomingDate) {
      const selected = new Date(incomingDate);
      const now = new Date(today);
      if (selected > now) {
        alert("You cannot add emotions for a future date.");
        navigate("/calendar");
        return;
      }
    }

    // Si la fecha cambia, limpiar los campos
    if (!incomingDate) {
      setDayMood(null);
      setAllSelections({});
      return;
    }

    // Buscar en Redux calendarEvents
    const event = calendarEvents.find((ev) => ev.date === incomingDate);
    if (event) {
      setDayMood(event.mood || null);
      setAllSelections(event.selections || {});
    } else {
      // Fallback a localStorage si no está en Redux
      const data = JSON.parse(localStorage.getItem("day-feedbacks")) || {};
      setDayMood(data[incomingDate] || null);
      // Recuperar selecciones de localStorage
      const categories = [
        "Emotions",
        "People",
        "Weather",
        "Hobbies",
        "Events",
        "Health",
      ];
      const selections = {};
      categories.forEach((cat) => {
        const key = `emotions_${cat}`;
        const items = JSON.parse(localStorage.getItem(key)) || [];
        if (items.length > 0) selections[cat] = items;
      });
      setAllSelections(selections);
    }
  }, [location.state?.selectedDate, calendarEvents]);

  const handlerSelectionChange = (title, selectItems) => {
    setAllSelections((prev) => ({ ...prev, [title]: selectItems }));
  };

  const handlerSaveAll = async () => {
    if (!dayMood) {
      alert("It is mandatory to select an emotion");
      return;
    }

    const emotionsDataToSave = {
      mood: dayMood,
      selections: allSelections,
      date: selectedDate,
    };

    dispatch(
      setEmotionsForDate({ date: selectedDate, data: emotionsDataToSave })
    );
    await saveCalendarEventToFirestore(emotionsDataToSave, selectedDate);

    // Actualizar Redux calendar.events inmediatamente
    const updatedEvents = [
      ...calendarEvents.filter((ev) => ev.date !== selectedDate),
      emotionsDataToSave,
    ];
    dispatch(setCalendarEvents(updatedEvents));

    const hasSavedBefore = localStorage.getItem("hasSavedEmotionBefore");

    if (!hasSavedBefore) {
      localStorage.setItem("hasSavedEmotionBefore", "true");
      setShowModal(true);
    } else {
      alert("Emotion updated successfully for this day ✅");
      navigate("/calendar");
    }
  };

  const goToCalendar = () => {
    navigate("/calendar");
  };

  if (!selectedDate) return null;

  const handlerBackClick = () => {
    navigate("/calendar");
  };

  return (
    <section className="emotionstrackerr">
      <Menu />
      <section className="emotion-tracker-back-container">
        <section className="back-button" onClick={handlerBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} className="icon-arrow" />
        </section>
      </section>
      <section className="selected-date-header">
        <span>{selectedDate}</span>
        <span className="date-arrow-icon" onClick={goToCalendar}>
          ▼
        </span>
      </section>
      <DayFeedbackCard
        onSelect={setDayMood}
        date={selectedDate}
        selectedMood={dayMood}
      />
      <ListEmotions
        title="Emotions"
        emotions={emotionsData}
        onSelectionChange={handlerSelectionChange}
        selectedItems={allSelections["Emotions"] || []}
      />
      <ListEmotions
        title="People"
        emotions={peopleData}
        onSelectionChange={handlerSelectionChange}
        selectedItems={allSelections["People"] || []}
      />
      <ListEmotions
        title="Weather"
        emotions={weatherData}
        onSelectionChange={handlerSelectionChange}
        selectedItems={allSelections["Weather"] || []}
      />
      <ListEmotions
        title="Hobbies"
        emotions={hobbiesData}
        onSelectionChange={handlerSelectionChange}
        selectedItems={allSelections["Hobbies"] || []}
      />
      <ListEmotions
        title="Events"
        emotions={eventsData}
        onSelectionChange={handlerSelectionChange}
        selectedItems={allSelections["Events"] || []}
      />
      <ListEmotions
        title="Health"
        emotions={healthData}
        onSelectionChange={handlerSelectionChange}
        selectedItems={allSelections["Health"] || []}
      />
      <section className="save-emotions-wrapper">
        <button className="save-emotions-btn" onClick={handlerSaveAll}>
          Confirm
        </button>
      </section>

    </section>
  );
};

export default EmotionTracker;
