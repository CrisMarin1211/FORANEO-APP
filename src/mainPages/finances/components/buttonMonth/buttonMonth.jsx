import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import "./buttonMonth.css";
import CalendarMonth from "../calendarMonth/calendarMonth";

const FloatingButton = ({ onClick, displayMonth }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const buttonRef = React.useRef(null);


  useEffect(() => {

    const handleClickOutside = (event) => {

      const antdDropdowns = document.querySelectorAll('.ant-picker-dropdown');
      let clickedInDropdown = false;

      antdDropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) {
          clickedInDropdown = true;
        }
      });

      if (buttonRef.current &&
          !buttonRef.current.contains(event.target) &&
          !clickedInDropdown) {
        setShowCalendar(false);
      }
    };


    if (showCalendar) {

      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };


  const handleSelectMonth = (date) => {
    if (date) {
      onClick(date);

      setTimeout(() => {
        setShowCalendar(false);
      }, 100);
    }
  };

  return (
    <section className="button-month-wrapper" ref={buttonRef}>
      <button className="floating-button" onClick={toggleCalendar}>
        <Calendar className="iconCalendar" size={25} color="white" />
        <section className="text">
          <strong className="monthly">Monthly View</strong>
          <p className="monthText">{displayMonth || "Select Month"}</p>
        </section>
      </button>

      {showCalendar && (
        <section className="calendar-overlay">
          <CalendarMonth onSelectMonth={handleSelectMonth} />
        </section>
      )}
    </section>
  );
};

export default FloatingButton;