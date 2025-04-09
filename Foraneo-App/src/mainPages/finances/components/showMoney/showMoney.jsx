import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './showMoney.css';

const ShowMoney = ({ totalExpenses, totalIncomes, balance }) => {
  const navigate = useNavigate();

  return (
    <section className="money-container">
      <section className="top-section">
        <section className="money-card expense">
          <h2 className="h2text expenseValue">
            <ArrowDownOutlined className="expense-icon" /> ${totalExpenses.toLocaleString()}
          </h2>
          <p>Expense</p>
          <button
            className="add-btn"
            onClick={() => navigate('/add?tab=Expenses')}  // Enviar parámetro de tab
          >
            <PlusOutlined /> Add
          </button>
        </section>

        <section className="money-card income">
          <h2 className="h2text">
            <ArrowUpOutlined className="income-icon" /> ${totalIncomes.toLocaleString()}
          </h2>
          <p>Income</p>
          <button
            className="add-btn"
            onClick={() => navigate('/add?tab=Incomes')}  // Enviar parámetro de tab
          >
            <PlusOutlined /> Add
          </button>
        </section>
      </section>

      <section className="balance-container">
        <section className="money-card-balance">
          <p className='ptotal' >✦ Total balance: </p>
          <br></br>
          <h2 className={`h2text1`}> ${balance.toLocaleString()}</h2>
        </section>
      </section>
    </section>
  );
};

export default ShowMoney;
