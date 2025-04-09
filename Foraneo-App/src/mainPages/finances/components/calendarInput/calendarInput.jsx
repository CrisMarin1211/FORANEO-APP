import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment'; // Asegúrate de tener moment importado

const CalendarInput = ({ setDate, date }) => {
  const onChange = (date, dateString) => {
    console.log('Fecha seleccionada:', dateString); // Verifica el valor de la fecha seleccionada
    setDate(dateString); // Actualizamos el estado con la fecha seleccionada
  };

  return (
    <Space direction="vertical">
      <DatePicker
        onChange={onChange}
        value={date ? moment(date, 'YYYY-MM-DD') : null} // Usamos `moment` para convertir la fecha
      />
    </Space>
  );
};

export default CalendarInput;
