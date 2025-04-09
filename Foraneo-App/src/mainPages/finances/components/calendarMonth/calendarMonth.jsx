import React from 'react';
import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const calendarMonth = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} picker="month" />
  </Space>
);
export default calendarMonth;