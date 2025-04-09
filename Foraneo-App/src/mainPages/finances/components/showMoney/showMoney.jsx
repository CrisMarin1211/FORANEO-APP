import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './showMoney.css';

const ShowMoney = ({ totalExpenses, totalIncomes, balance }) => {
  const navigate = useNavigate();

  // Aseguramos que el balance no sea negativo
  const totalAvailable = Math.max(balance, 0); // Si balance es negativo, se mostrará 0

  // Definir la clase de fondo para el balance
  const balanceClass = totalAvailable === 0 ? 'balance-zero' : 'balance-positive';

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

      {/* Cambiar el fondo de money-card-balance según el balance */}
      <section className={`money-card-balance ${balanceClass}`}>
        <p className='ptotal' >✦ Total available: </p>
        <br></br>
        <h2 className={`h2text1`}> ${totalAvailable.toLocaleString()}</h2> {/* Mostramos totalAvailable */}
      </section>
    </section>
  );
};

export default ShowMoney;
