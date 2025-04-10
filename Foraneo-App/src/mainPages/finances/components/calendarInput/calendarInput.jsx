import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment'; 
import './calendarInput.css'

const CalendarInput = ({ setDate, date }) => {
  const onChange = (date, dateString) => {

    setDate(dateString);
  };

  return (
    <Space direction="vertical">
      <DatePicker
        className='calendarInput'
        onChange={onChange}
        value={date ? moment(date, 'YYYY-MM-DD') : null}
      />
    </Space>
  );
};

export default CalendarInput;
