import React, { useState } from 'react';
import { DatePicker } from 'antd';
import './calendarMonth.css';

const CalendarMonth = ({ onSelectMonth }) => {
  const monthFormat = 'YYYY-MM';

  const handleMonthChange = (date, dateString) => {
    if (dateString) {
      onSelectMonth(dateString);
    }
  };

  return (
    <section className="custom-month-picker">
      <DatePicker
        picker="month"
        onChange={handleMonthChange}

        className="month-picker-visible"
        popupClassName="custom-month-dropdown"

        open={true}
        onBlur={() => {}}
        autoFocus={true}
      />
    </section>
  );
};

export default CalendarMonth;