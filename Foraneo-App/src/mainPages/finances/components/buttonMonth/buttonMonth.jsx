import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import "./buttonMonth.css";
import CalendarMonth from "../calendarMonth/calendarMonth";

const FloatingButton = ({ onClick, displayMonth }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const buttonRef = React.useRef(null);

  // Manejador para clics fuera del componente
  useEffect(() => {
    // Función para manejar clics fuera del componente
    const handleClickOutside = (event) => {
      // No cerrar si el clic fue dentro del panel de Ant Design
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

    // Agregar el listener solo cuando el calendario está visible
    if (showCalendar) {
      // Pequeño retraso para evitar que se cierre inmediatamente
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

  // Manejar la selección de mes
  const handleSelectMonth = (date) => {
    if (date) {
      onClick(date);
      // Retrasar ligeramente el cierre para evitar problemas con Ant Design
      setTimeout(() => {
        setShowCalendar(false);
      }, 100);
    }
  };

  return (
    <div className="button-month-wrapper" ref={buttonRef}>
      <button className="floating-button" onClick={toggleCalendar}>
        <Calendar className="iconCalendar" size={25} color="white" />
        <div className="text">
          <strong className="monthly">Monthly View</strong>
          <p className="monthText">{displayMonth || "Select Month"}</p>
        </div>
      </button>

      {showCalendar && (
        <div className="calendar-overlay">
          <CalendarMonth onSelectMonth={handleSelectMonth} />
        </div>
      )}
    </div>
  );
};

export default FloatingButton;