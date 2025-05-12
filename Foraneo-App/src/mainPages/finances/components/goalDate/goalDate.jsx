import React from 'react';
import { DatePicker, Space } from 'antd';
import './GoalDate.css'; // Asegúrate de que el archivo CSS esté correctamente importado

const { RangePicker } = DatePicker;

const GoalDate = ({ setStartDate, setEndDate }) => {
  const handleStartDateChange = (date) => {
    // Al seleccionar la fecha de inicio, actualizamos el estado de startDate
    setStartDate(date ? date.toDate() : null); // Convertimos la fecha seleccionada a Date
  };

  const handleEndDateChange = (date) => {
    // Al seleccionar la fecha final, actualizamos el estado de endDate
    setEndDate(date ? date.toDate() : null); // Convertimos la fecha seleccionada a Date
  };

  return (
    <Space direction="vertical" size={12}>
      {/* Dos DatePicker separados: uno para la fecha de inicio y otro para la fecha final */}
      <DatePicker
        placeholder="Start Date"
        onChange={handleStartDateChange}
        style={{ width: '100%' }}
      />
      <DatePicker
        placeholder="End Date"
        onChange={handleEndDateChange}
        style={{ width: '100%' }}
      />
    </Space>
  );
};

export default GoalDate;
