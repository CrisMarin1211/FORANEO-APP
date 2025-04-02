import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './showMoney.css';

const ShowMoney = () => {
  const navigate = useNavigate();

  // Datos quemados (ejemplo)
  const income = 23000;
  const expenses = 150000;
  const balance = income - expenses;

  return (
    <section className="money-container">
      <section className="money-card expense">
        <h2><ArrowDownOutlined className="icon expense-icon" /> ${expenses.toLocaleString()}</h2>
        <p>Expense</p>
        <button className="add-btn" onClick={() => navigate('/add')}>
          <PlusOutlined /> Add
        </button>
      </section>

      <section className="money-card income">
        <h2><ArrowUpOutlined className="icon income-icon" /> ${income.toLocaleString()}</h2>
        <p>Income</p>
        <button className="add-btn" onClick={() => navigate('/add')}>
          <PlusOutlined /> Add
        </button>
      </section>

      <section className="money-card balance">
        <h2>${balance.toLocaleString()}</h2>
        <p> ✅ Total balance</p>
      </section>
    </section>
  );
};

export default ShowMoney;
