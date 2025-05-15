
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import GoalDate from '../goalDate/goalDate';
import './goalForm.css';

const GoalForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [value, setValue] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const calculateWeeklySavings = (startDate, endDate, goalValue) => {
    if (startDate && endDate && goalValue) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end - start;
      const daysInWeeks = 7;
      const weeks = Math.ceil(timeDifference / (1000 * 3600 * 24 * daysInWeeks));
      const weeklySavings = goalValue / weeks;
      return weeklySavings;
    }
    return 0;
  };

  const handleFormSubmit = () => {
    const weeklySavings = calculateWeeklySavings(startDate, endDate, value);

    const goalData = {
      name,
      details,
      value,
      startDate,
      endDate,
      totalContributed: 0,
      remaining: value,
      weeklySavings: weeklySavings
    };

    onSubmit(goalData);

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
        <Button type="primary" htmlType="submit" className="submittt-button">Save Goal</Button>
        </section>
      </Form>
    </section>
  );
};

export default GoalForm;
