import React, { useEffect, useState } from "react";
import "./calendar.css";
import { faces } from "../../data/imagesData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SummaryEmotions from "../summaryEmotions/summaryEmotions";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [dayFeedbacks, setDayFeedbacks] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showSummary, setShowSummary] = useState(false);
  const [summaryDate, setSummaryDate] = useState(null);
  const navigate = useNavigate();
  const calendarEvents = useSelector((state) => state.calendar.events);

  useEffect(() => {
    const date = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = date.getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      daysArray.push(i);
    }
    setDaysInMonth(daysArray);

    // Usar calendarEvents de Redux para feedbacks
    const feedbacks = {};
    calendarEvents.forEach((ev) => {
      if (ev.date && ev.mood) {
        feedbacks[ev.date] = ev.mood;
      }
    });
    setDayFeedbacks(feedbacks);
  }, [currentMonth, currentYear, calendarEvents]);

  const getDateKey = (day) => {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const monthStr =
      currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
    return `${currentYear}-${monthStr}-${dayStr}`;
  };

  const getFaceByLabel = (label) => {
    return faces.find((face) => face.label === label)?.src || null;
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const selectedDate = getDateKey(day);
    const hasEvent = calendarEvents.some((ev) => ev.date === selectedDate);
    if (hasEvent) {
      setSummaryDate(selectedDate);
      setShowSummary(true);
    } else {
      navigate("/emotions", { state: { selectedDate } });
    }
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <>
      {showSummary && (
        <SummaryEmotions
          date={summaryDate}
          onClose={() => setShowSummary(false)}
        />
      )}
      <section className="calendar-container">
        <section className="calendar-controls">
          <button className="arrowbu" onClick={goToPrevMonth}>
            ←
          </button>
          <span className="calendarSpan">
            {new Date(currentYear, currentMonth).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button className="arrowbu" onClick={goToNextMonth}>
            →
          </button>
        </section>

        <section className="calendar-grid">
          {daysOfWeek.map((d) => (
            <section key={d} className="calendar-day-header">
              {d}
            </section>
          ))}

          {daysInMonth.map((day, index) => {
            const dateKey = day ? getDateKey(day) : null;
            const mood = dayFeedbacks[dateKey];
            const faceSrc = getFaceByLabel(mood);

            return (
              <section
                key={index}
                className={`calendar-day ${day ? "clickable" : "empty"}`}
                onClick={() => handleDayClick(day)}
              >
                {day && (
                  <section className="calendar-item">
                    <svg
                      className="calendar-svg"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#79CFD9"
                        strokeWidth="5"
                        fill="white"
                      />
                      {faceSrc && (
                        <image
                          href={faceSrc}
                          x="12"
                          y="12"
                          width="80"
                          height="80"
                        />
                      )}
                    </svg>
                    <section className="calendar-day-number">{day}</section>
                  </section>
                )}
              </section>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default Calendar;
