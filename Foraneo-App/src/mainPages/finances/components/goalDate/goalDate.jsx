import React from 'react';
import { DatePicker, Space } from 'antd';
import './goalDate.css';

const { RangePicker } = DatePicker;

const GoalDate = ({ setStartDate, setEndDate }) => {
  const handleStartDateChange = (date) => {

    setStartDate(date ? date.toDate() : null);
  };

  const handleEndDateChange = (date) => {

    setEndDate(date ? date.toDate() : null);
  };

  return (
    <Space direction="vertical" size={12}>

      <DatePicker
        className="calendarInputt"
         picker="date"
        placeholder="Start Date"
        onChange={handleStartDateChange}
        style={{ width: '100%' }}
      />
      <DatePicker
      className="calendarInputt"
       picker="date"
        placeholder="End Date"
        onChange={handleEndDateChange}
        style={{ width: '100%' }}
      />
    </Space>
  );
};

export default GoalDate;
