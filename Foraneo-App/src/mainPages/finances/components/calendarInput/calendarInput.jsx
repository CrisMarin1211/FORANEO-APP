import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import './calendarInput.css'

const CalendarInput = ({ setDate, date }) => {
  const onChange = (date, dateString) => {

    setDate(dateString);
  };

  return (
    <Space className='hol' direction="vertical">
      <DatePicker
      picker="date"
        className='calendarInput'
        popupClassName="calendarInput-dropdown"
        onChange={onChange}
        value={date ? moment(date, 'YYYY-MM-DD') : null}
      />
    </Space>
  );
};

export default CalendarInput;
