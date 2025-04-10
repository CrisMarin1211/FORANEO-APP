import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Utensils, Bus, PartyPopper, Home, BookOpenCheck, User, Gamepad2, Heart,
  BanknoteArrowDown, Gift, AlertTriangle, MoreHorizontal, Banknote, BriefcaseBusiness, ChartNoAxesCombined
} from "lucide-react";
import './statistics.css';

const Statistics = ({ filteredData }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      const expenseData = filteredData.filter(item => item.type === 'Expense');
      const incomeData = filteredData.filter(item => item.type === 'Income');

      setExpenses(expenseData);
      setIncomes(incomeData);

      const expenseTotal = expenseData.reduce((sum, item) => sum + Number(item.value), 0);
      const incomeTotal = incomeData.reduce((sum, item) => sum + Number(item.value), 0);

      setTotalExpenses(expenseTotal);
      setTotalIncomes(incomeTotal);

      const expenseCats = {};
      expenseData.forEach(item => {
        if (expenseCats[item.category]) {
          expenseCats[item.category] += Number(item.value);
        } else {
          expenseCats[item.category] = Number(item.value);
        }
      });

      const expenseCategoriesData = Object.keys(expenseCats).map((category, index) => {
        return {
          id: index,
          value: expenseCats[category],
          label: category,
          percentage: Math.round((expenseCats[category] / expenseTotal) * 100)
        };
      });
      setExpenseCategories(expenseCategoriesData);

      const incomeCats = {};
      incomeData.forEach(item => {
        if (incomeCats[item.category]) {
          incomeCats[item.category] += Number(item.value);
        } else {
          incomeCats[item.category] = Number(item.value);
        }
      });

      const incomeCategoriesData = Object.keys(incomeCats).map((category, index) => {
        return {
          id: index,
          value: incomeCats[category],
          label: category,
          percentage: Math.round((incomeCats[category] / incomeTotal) * 100)
        };
      });
      setIncomeCategories(incomeCategoriesData);
    }
  }, [filteredData]);


  const colors = ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'];


  const categoryIcons = {
    'Salary': <Banknote />,
    'Investment': <ChartNoAxesCombined />,
    'Business': <BriefcaseBusiness />,
    'Other Income': <MoreHorizontal />,
    'Food': <Utensils />,
    'Transport': <Bus />,
    'Fun': <PartyPopper />,
    'Study': <BookOpenCheck />,
    'Personal': <User />,
    'Games': <Gamepad2 />,
    'Health': <Heart />,
    'Debt & Loans': <BanknoteArrowDown />,
    'Home': <Home />,
    'Gifts': <Gift />,
    'Urgency': <AlertTriangle />,
    'Other': <MoreHorizontal />,
  };

  if (expenses.length === 0 && incomes.length === 0) {
    return (
      <section className="no-data-message">
        <p>No statistics available for this month.</p>
      </section>
    );
  }

  return (
    <section className="statistics-container">
      <section className="statistics-section">
        <h2>Expenses <span className="month-indicator">Mon</span></h2>
        {expenses.length > 0 ? (
          <>
            <section className="chart-container">
              <PieChart
                series={[{
                  data: expenseCategories,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                }]}
                width={300}
                height={200}
                colors={colors}
              />
              <section className="chart-legend">
                {expenseCategories.map((category, index) => (
                  <section key={index} className="legend-item">
                    <section className="color-box" style={{ backgroundColor: colors[index % colors.length] }}></section>
                    <span>{category.label}</span>
                    <span className="percentage">{category.percentage}%</span>
                  </section>
                ))}
              </section>
            </section>
            <section className="category-list">
              {expenseCategories.map((category, index) => (
                <section key={index} className="category-item">
                  <section className="category-icon">
                    {categoryIcons[category.label] || <MoreHorizontal />}
                  </section>
                  <section className="category-name">{category.label}</section>
                  <section className="category-bar">
                    <section
                      className="bar-fill"
                      style={{ width: `${category.percentage}%`, backgroundColor: colors[index % colors.length] }}
                    ></section>
                  </section>
                  <section className="category-amount">${category.value.toLocaleString()}</section>
                </section>
              ))}
            </section>
          </>
        ) : (
          <section className="no-data-chart">
            <p>No expense data for this month</p>
          </section>
        )}
      </section>

      <section className="statistics-section">
        <h2>Incomes <span className="month-indicator">Mon</span></h2>
        {incomes.length > 0 ? (
          <>
            <section className="chart-container">
              <PieChart
                series={[{
                  data: incomeCategories,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                }]}
                width={300}
                height={200}
                colors={colors}
              />
              <section className="chart-legend">
                {incomeCategories.map((category, index) => (
                  <section key={index} className="legend-item">
                    <section className="color-box" style={{ backgroundColor: colors[index % colors.length] }}></section>
                    <span>{category.label}</span>
                  </section>
                ))}
              </section>
            </section>
            <section className="category-list">
              {incomeCategories.map((category, index) => (
                <section key={index} className="category-item">
                  <section className="category-icon">
                    {categoryIcons[category.label] || <MoreHorizontal />}
                  </section>
                  <section className="category-name">{category.label}</section>
                  <section className="category-bar">
                    <section
                      className="bar-fill"
                      style={{ width: `${category.percentage}%`, backgroundColor: colors[index % colors.length] }}
                    ></section>
                  </section>
                  <section className="category-amount">${category.value.toLocaleString()}</section>
                </section>
              ))}
            </section>
          </>
        ) : (
          <section className="no-data-chart">
            <section className="empty-pie-chart">
              <PieChart
                series={[{
                  data: [{ id: 0, value: 1, label: 'No incomes today', percentage: 0 }],
                  innerRadius: 30, outerRadius: 100, paddingAngle: 0, cornerRadius: 0
                }]}
                width={300}
                height={200}
                colors={['#D3D3D3']}
              />
              <section className="chart-legend">
                <section className="legend-item">
                  <section className="color-box" style={{ backgroundColor: '#D3D3D3' }}></section>
                  <span>No incomes today</span>
                  <span className="amount">$0</span>
                </section>
              </section>
            </section>
          </section>
        )}
      </section>
    </section>
  );
};

export default Statistics;
