import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './showMoney.css';

const ShowMoney = ({ selectedMonth }) => {
  const navigate = useNavigate();

  const { totalAvailable, expenses, incomes } = useSelector((state) => state.finances);

  const filteredExpenses = expenses.filter((item) => {
    const itemDate = new Date(item.date);
    const itemMonth = itemDate.getMonth();
    const itemYear = itemDate.getFullYear();
    const [selectedYear, selectedMonthIndex] = selectedMonth.split('-');
    return itemYear === parseInt(selectedYear) && itemMonth === parseInt(selectedMonthIndex) - 1;
  });

  const filteredIncomes = incomes.filter((item) => {
    const itemDate = new Date(item.date);
    const itemMonth = itemDate.getMonth();
    const itemYear = itemDate.getFullYear();
    const [selectedYear, selectedMonthIndex] = selectedMonth.split('-');
    return itemYear === parseInt(selectedYear) && itemMonth === parseInt(selectedMonthIndex) - 1;
  });

  const validTotalExpenses = filteredExpenses.reduce((sum, item) => sum + item.value, 0) ?? 0;
  const validTotalIncomes = filteredIncomes.reduce((sum, item) => sum + item.value, 0) ?? 0;

  const balance = validTotalIncomes - validTotalExpenses;
  const balanceClass = balance === 0 ? 'balance-zero' : 'balance-positive';

  const totalAvailableClass = totalAvailable <= 0 ? 'balance-zero' : 'balance-positive';

  return (
    <section className='money-container'>
      <section className='top-section'>
        <section className='money-card expense'>
          <h2 className='h2text expenseValue'>
            <ArrowDownOutlined className='expense-icon' /> ${validTotalExpenses.toLocaleString()}
          </h2>
          <p>Expense</p>
          <button className='add-btn' onClick={() => navigate('/add?tab=Expenses')}>
            <PlusOutlined /> Add
          </button>
        </section>

        <section className='money-card income'>
          <h2 className='h2text'>
            <ArrowUpOutlined className='income-icon' /> ${validTotalIncomes.toLocaleString()}
          </h2>
          <p>Income</p>
          <button className='add-btn' onClick={() => navigate('/add?tab=Incomes')}>
            <PlusOutlined /> Add
          </button>
        </section>
      </section>

      <section className={`money-card-balance ${totalAvailableClass}`}>
        <p className='ptotal'>✦ Total available: </p>
        <br></br>
        <h2 className={`h2text1`}> ${totalAvailable <= 0 ? '0' : totalAvailable.toLocaleString()}</h2> {/* Total available */}
      </section>
    </section>
  );
};

export default ShowMoney;
