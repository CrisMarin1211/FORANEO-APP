// GoalForm.js
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import GoalDate from '../goalDate/goalDate'; // Asegúrate de tener el componente GoalDate
import './goalForm.css'; // Importamos el CSS

const GoalForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [value, setValue] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Calcular el ahorro semanal solo cuando se crea la meta
  const calculateWeeklySavings = (startDate, endDate, goalValue) => {
    if (startDate && endDate && goalValue) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end - start;  // Diferencia de tiempo en milisegundos
      const daysInWeeks = 7;  // Número de días por semana
      const weeks = Math.ceil(timeDifference / (1000 * 3600 * 24 * daysInWeeks));  // Convertir días a semanas
      const weeklySavings = goalValue / weeks;  // Calcular cuánto debe ahorrar por semana
      return weeklySavings;
    }
    return 0;
  };

  const handleFormSubmit = () => {
    // Calcular weeklySavings solo cuando se crea la meta, no al añadir dinero
    const weeklySavings = calculateWeeklySavings(startDate, endDate, value);

    const goalData = {
      name,
      details,
      value,
      startDate,
      endDate,
      totalContributed: 0,
      remaining: value,
      weeklySavings: weeklySavings // Agregar weekly savings a la meta
    };

    onSubmit(goalData);  // Enviamos los datos al componente principal

    message.success('Goal saved!');
  };

  return (
    <section className="form-container">
      <Form onFinish={handleFormSubmit}>
        <h2>Create a New Goal</h2>

        <Form.Item label="Goal Name" name="goalName" rules={[{ required: true, message: 'Please input your goal name!' }]}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter goal name"
            className="input-style"
          />
        </Form.Item>

        <Form.Item label="Details" name="goalDetails">
          <Input.TextArea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter goal details"
            autoSize={{ minRows: 3, maxRows: 5 }}
            className="text-area-style"
          />
        </Form.Item>

        <Form.Item label="Goal Value" name="goalValue" rules={[{ required: true, message: 'Please input your goal value!' }]}>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            className="input-style"
          />
        </Form.Item>

        <GoalDate setStartDate={setStartDate} setEndDate={setEndDate} />

        <section>
        <Button type="primary" htmlType="submit" className="submit-button">Save Goal</Button>
        </section>
      </Form>
    </section>
  );
};

export default GoalForm;
