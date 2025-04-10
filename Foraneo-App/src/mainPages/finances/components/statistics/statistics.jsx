import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Progress } from 'antd';
import {
  Utensils, Bus, PartyPopper, Home, BookOpenCheck, User, Gamepad2, Heart,
  BanknoteArrowDown, Gift, AlertTriangle, MoreHorizontal, Banknote, BriefcaseBusiness, ChartNoAxesCombined
} from "lucide-react";
import './statistics.css';

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


const categoryColors = {
  'Salary': '#4361ee',
  'Investment': '#3a86ff',
  'Business': '#38b000',
  'Other Income': '#fb5607',
  'Food': '#ff006e',
  'Transport': '#8338ec',
  'Fun': '#ff5400',
  'Study': '#3a0ca3',
  'Personal': '#4cc9f0',
  'Games': '#7209b7',
  'Health': '#06d6a0',
  'Debt & Loans': '#d90429',
  'Home': '#118ab2',
  'Gifts': '#ffbe0b',
  'Urgency': '#ef476f',
  'Other': '#073b4c',
};

const Statistics = ({ filteredData }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [chartColors, setChartColors] = useState([]);

  useEffect(() => {
    if (!filteredData?.length) return;

    const expenseData = filteredData.filter(item => item.type === 'Expense');
    const incomeData = filteredData.filter(item => item.type === 'Income');

    setExpenses(expenseData);
    setIncomes(incomeData);

    const getCategoryData = (data) => {
      const grouped = {};
      data.forEach(item => {
        grouped[item.category] = (grouped[item.category] || 0) + Number(item.value);
      });

      const total = Object.values(grouped).reduce((a, b) => a + b, 0);

      return Object.entries(grouped)
        .map(([label, value], index) => ({
          id: index,
          label,
          value,
          percentage: Math.round((value / total) * 100),
          color: categoryColors[label] || `hsl(${index * 40}, 70%, 50%)`
        }))
        .sort((a, b) => b.value - a.value);
    };

    const expCategories = getCategoryData(expenseData);
    const incCategories = getCategoryData(incomeData);

    setExpenseCategories(expCategories);
    setIncomeCategories(incCategories);

    // Set chart colors
    setChartColors([
      ...expCategories.map(cat => cat.color),
      ...incCategories.map(cat => cat.color)
    ]);
  }, [filteredData]);

  const pieOptions = (labels, colors) => ({
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    colors: colors,
    labels,
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',

        }
      }
    },
    stroke: { width: 0 },
    tooltip: {
      y: {
        formatter: (val) => `$${Number(val).toLocaleString()}`
      }
    }
  });

  const getCurrentMonth = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    return months[now.getMonth()];
  };

  return (
    <section className="statistics-container">
      <section className="statistics-section">
        <h2>Expenses <span className="month-indicator">{getCurrentMonth()}</span></h2>
        {expenseCategories.length > 0 ? (
          <>
            <section className="chart-section">
              <ReactApexChart
                options={pieOptions(
                  expenseCategories.map(c => c.label),
                  expenseCategories.map(c => c.color)
                )}
                series={expenseCategories.map(c => c.value)}
                type="donut"
                width={220}
              />


            </section>

            <section className="category-bar-list">
  {expenseCategories.slice(0, 5).map((cat, index) => (
    <section className="category-bar-item" key={index}>
      <section
        className="category-bar-icon"
        style={{
          color: cat.color,
          backgroundColor: `${cat.color}20`
        }}
      >
        {categoryIcons[cat.label]}
      </section>

      <section className="category-bar-info">
        <section className="category-bar-label">{cat.label}</section>
        <section className="category-bar-amount">${cat.value.toLocaleString()}</section>
        <section className="category-bar-percentage">{cat.percentage}%</section>
      </section>

      <Progress
        percent={cat.percentage}
        size="small"
        showInfo={false}
        style={{ flexGrow: 1 }}
        strokeColor={cat.color}
      />
    </section>
  ))}
</section>

          </>
        ) : (
          <p>No expense data for this month</p>
        )}
      </section>

      <section className="statistics-section">
        <h2>Incomes <span className="month-indicator">{getCurrentMonth()}</span></h2>
        {incomeCategories.length > 0 ? (
          <>
            <section className="chart-section">
              <ReactApexChart
                options={pieOptions(
                  incomeCategories.map(c => c.label),
                  incomeCategories.map(c => c.color)
                )}
                series={incomeCategories.map(c => c.value)}
                type="donut"
                width={220}
              />

                         </section>

            <section className="category-bar-list">
              {incomeCategories.slice(0, 5).map((cat, index) => (


<section className="category-bar-item" key={index}>
  <section
    className="category-bar-icon"
    style={{
      color: cat.color,
      backgroundColor: `${cat.color}20`
    }}
  >
    {categoryIcons[cat.label]}
  </section>
  <section className="category-bar-info">
    <section className="category-bar-label">{cat.label}</section>
    <section className="category-bar-amount">${cat.value.toLocaleString()}</section>
    <section className="category-bar-percentage">{cat.percentage}%</section>
  </section>
  <Progress
    percent={cat.percentage}
    size="small"
    showInfo={false}
    style={{ flexGrow: 1 }}
    strokeColor={cat.color}
  />
</section>


              ))}
            </section>
          </>
        ) : (
          <p>No income data for this month</p>
        )}
      </section>
    </section>
  );
};

export default Statistics;