import React, { useState, useEffect } from 'react';
import './bigInfoSection.css';
import Timeline from '../timeline/timeline';

const BigInfoSection = ({ selectedMonth, hasNoData }) => {
  const [activeTab, setActiveTab] = useState('Timeline');
  const [savedData, setSavedData] = useState([]);

  // Cargar los datos de localStorage cuando el componente se monta
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('savedData')) || [];
    setSavedData(storedData);
  }, []);

  // Filtrar los datos por mes seleccionado
  const filterDataByMonth = (month) => {
    if (!month) return []; // Si no hay mes seleccionado, devolvemos array vacío

    const [selectedYear, selectedMonthIndex] = month.split('-'); // Formato 'YYYY-MM'

    return savedData.filter(item => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth(); // 0-11

      return itemYear === parseInt(selectedYear) && itemMonth === parseInt(selectedMonthIndex) - 1;
    });
  };

  // Filtrar los datos por el mes seleccionado
  const filteredData = filterDataByMonth(selectedMonth);

  // Componente para mostrar mensaje cuando no hay datos
  const NoDataMessage = () => (
    <div className="no-data-message" style={{
      textAlign: 'center',
      padding: '2rem',
      color: '#555'
    }}>
      <p>You don't have expenses or incomes for this month yet.</p>
    </div>
  );

  // Función para renderizar el contenido según la pestaña activa
  const renderContent = () => {
    // Si no hay datos filtrados, mostrar mensaje
    if (hasNoData || filteredData.length === 0) {
      return <NoDataMessage />;
    }

    switch (activeTab) {
      case 'Timeline':
        return <Timeline data={filteredData} selectedMonth={selectedMonth} />;
      case 'Statistics':
        return <p>Data Statistics Lorem Ipsum.</p>;
      case 'Goal':
        return <p>Data Goal Lorem Ipsum.</p>;
      default:
        return null;
    }
  };

  return (
    <section className="big-info-container">
      <section className="tabs">
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

      <section className="tab-content">
        {renderContent()}
      </section>
    </section>
  );
};

export default BigInfoSection;