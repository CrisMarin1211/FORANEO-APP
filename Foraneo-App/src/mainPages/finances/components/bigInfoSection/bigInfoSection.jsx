// BigInfoSection.jsx
import React, { useState, useEffect } from 'react';
import './bigInfoSection.css';
import Timeline from '../timeline/timeline';
import Statistics from '../statistics/statistics';
import GoalSection from '../goalSection/goalSection1';
import { useSelector } from 'react-redux';  // Usamos useSelector para obtener la meta

const BigInfoSection = ({ selectedMonth, hasNoData }) => {
  const [activeTab, setActiveTab] = useState('Timeline');
  const [savedData, setSavedData] = useState([]);
  const goal = useSelector((state) => state.finances.goal);  // Obtener la meta desde Redux

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('savedData')) || [];
    setSavedData(storedData);
  }, []);

  // Función para filtrar los datos según el mes seleccionado
  const filterDataByMonth = (month) => {
    if (!month) return [];

    const [selectedYear, selectedMonthIndex] = month.split('-');
    return savedData.filter((item) => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();

      return itemYear === parseInt(selectedYear) && itemMonth === parseInt(selectedMonthIndex) - 1;
    });
  };

  const filteredData = filterDataByMonth(selectedMonth);

  const NoDataMessage = () => (
    <section
      className='no-data-message'
      style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#555',
      }}
    >
      <p>You don't have expenses or incomes for this month yet.</p>
    </section>
  );

  // Función para mostrar el contenido de acuerdo a la selección del mes
  const renderContent = () => {
    if (hasNoData || filteredData.length === 0) {
      return <NoDataMessage />;
    }

    // Si hay una meta y está dentro del rango de fechas, mostramos la barra de progreso
    const isGoalVisible = goal && new Date(goal.startDate) <= new Date(selectedMonth + '-01') && new Date(goal.endDate) >= new Date(selectedMonth + '-01');

    if (activeTab === 'Timeline') {
      return <Timeline className='timelinesectionbig' data={filteredData} selectedMonth={selectedMonth} />;
    } else if (activeTab === 'Statistics') {
      return <Statistics filteredData={filteredData} />;
    } else if (activeTab === 'Goal' && isGoalVisible) {
      return <GoalSection />;
    } else {
      return <GoalSection />;  // Mostrar la sección de goal si la meta está visible
    }
  };

  return (
    <section className='big-info-container'>
      <section className='tabs'>
        <section
          className={`tab ${activeTab === 'Timeline' ? 'active Timeline-tab' : ''}`}
          onClick={() => setActiveTab('Timeline')}
        >
          📃 Timeline
        </section>
        <section
          className={`tab ${activeTab === 'Statistics' ? 'active Statistics-tab' : ''}`}
          onClick={() => setActiveTab('Statistics')}
        >
          📊 Statistics
        </section>
        <section
          className={`tab ${activeTab === 'Goal' ? 'active Goal-tab' : ''}`}
          onClick={() => setActiveTab('Goal')}
        >
          🎯 Goal
        </section>
      </section>

      <section className='tab-content'>{renderContent()}</section>
    </section>
  );
};

export default BigInfoSection;
