import React, { useEffect, useState } from "react";
import "./summaryEmotions.css";
import { faces } from "../../data/imagesData";
import IconCircle2 from "../iconCircle/iconCircle";
import { Pencil } from "lucide-react";
import {
  emotionsData,
  hobbiesData,
  eventsData,
  peopleData,
  weatherData,
  healthData,
} from "../../data/iconsData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SummaryEmotions = ({ date, onClose }) => {
  const [currentFace, setCurrentFace] = useState(null);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [shownDate, setShownDate] = useState(null);
  const navigate = useNavigate();
  const calendarEvents = useSelector((state) => state.calendar.events);

  useEffect(() => {
    let targetDate = date;
    let event = null;
    if (calendarEvents && calendarEvents.length > 0) {
      if (!targetDate) {
        // Si no hay fecha, toma la más reciente
        const sorted = [...calendarEvents].sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        if (sorted.length > 0) targetDate = sorted[0].date;
      }
      event = calendarEvents.find((ev) => ev.date === targetDate);
    }
    setShownDate(targetDate);
    if (event) {
      // Usar datos del evento de Redux
      const mood = event.mood;
      const face = faces.find((f) => f.label === mood);
      setCurrentFace(face);
      const categories = [
        "Emotions",
        "People",
        "Weather",
        "Hobbies",
        "Events",
        "Health",
      ];
      const allData = [
        ...emotionsData,
        ...eventsData,
        ...hobbiesData,
        ...peopleData,
        ...healthData,
        ...weatherData,
      ];
      const icons = [];
      categories.forEach((cat) => {
        const items = (event.selections && event.selections[cat]) || [];
        items.forEach((itemName) => {
          const match = allData.find((i) => i.name === itemName);
          if (match) icons.push(match.icon);
        });
      });
      const paddedIcons = [...icons.slice(0, 10)];
      while (paddedIcons.length < 10) {
        paddedIcons.push(null);
      }
      setSelectedIcons(paddedIcons);
    } else {
      // Fallback a localStorage si no hay evento en Redux
      const data = JSON.parse(localStorage.getItem("day-feedbacks")) || {};
      if (!targetDate) {
        const dates = Object.keys(data).sort().reverse();
        if (dates.length > 0) targetDate = dates[0];
      }
      setShownDate(targetDate);
      if (targetDate) {
        const mood = data[targetDate];
        const face = faces.find((f) => f.label === mood);
        setCurrentFace(face);
        const categories = [
          "emotions_Emotions",
          "emotions_People",
          "emotions_Weather",
          "emotions_Hobbies",
          "emotions_Events",
          "emotions_Health",
        ];
        const allData = [
          ...emotionsData,
          ...eventsData,
          ...hobbiesData,
          ...peopleData,
          ...healthData,
          ...weatherData,
        ];
        const icons = [];
        categories.forEach((key) => {
          const items = JSON.parse(localStorage.getItem(key)) || [];
          items.forEach((itemName) => {
            const match = allData.find((i) => i.name === itemName);
            if (match) icons.push(match.icon);
          });
        });
        const paddedIcons = [...icons.slice(0, 10)];
        while (paddedIcons.length < 10) {
          paddedIcons.push(null);
        }
        setSelectedIcons(paddedIcons);
      }
    }
  }, [date, calendarEvents]);

  const handlerIconClick = () => {
    navigate("/emotions");
  };

  const handlerEditClick = () => {
    navigate("/emotions", { state: { selectedDate: shownDate } });
    if (onClose) onClose();
  };

  return (
      <section className="summary-card">
        <section className="summary-buttons">
        <button
          className="close-summary-btn"
          onClick={onClose}
        >
          X
        </button>
        <button
          className="edit-summary-btn"
          onClick={handlerEditClick}
        >
          <Pencil size={16} />
        </button>
        </section>

        <section className="icon-column">
          <section className="icon-wrapper">
            {currentFace && (
              <img className="current-face" src={currentFace.src} alt={currentFace.label}></img>
            )}
            <span className="icon-text">{shownDate}</span>
          </section>
        </section>
        <section className="food-column">
          <section className="row">
            {selectedIcons.slice(0, 5).map((icon, idx) => (
              <IconCircle2
                icon={icon}
                key={idx}

              />
            ))}
          </section>
          <section className="row">
            {selectedIcons.slice(5, 10).map((icon, idx) => (
              <IconCircle2
                icon={icon}
                key={idx + 5}

              />
            ))}
          </section>
        </section>
      </section>
  );
};

export default SummaryEmotions;
