import React, { useState } from 'react';
import { DatePicker } from 'antd';
import './calendarMonth.css';

const CalendarMonth = ({ onSelectMonth }) => {
  // Crear una instancia directa del panel de selección de mes
  // En lugar de ocultar el input, crear un panel personalizado
  const monthFormat = 'YYYY-MM';

  const handleMonthChange = (date, dateString) => {
    if (dateString) {
      onSelectMonth(dateString);
    }
  };

  return (
    <div className="custom-month-picker">
      <DatePicker
        picker="month"
        onChange={handleMonthChange}
        format={monthFormat}
        allowClear={false}  // Evitar el botón de clear
        variant={false}    // Quitar borde para un aspecto más limpio
        suffixIcon={null}   // Quitar el icono del calendario
        className="month-picker-visible"
        popupClassName="custom-month-dropdown"
        // Abrir automáticamente el dropdown al renderizar
        open={true}
        onBlur={() => {}}  // Prevenir que se cierre al perder el foco
        autoFocus={true}   // Dar el foco automáticamente
      />
    </div>
  );
};

export default CalendarMonth;