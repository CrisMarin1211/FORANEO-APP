import React, { useState, useEffect } from 'react';
import './bigInfoSection.css';
import Timeline from '../timeline/timeline';

const BigInfoSection = () => {
  const [activeTab, setActiveTab] = useState('Timeline');
  const [savedData, setSavedData] = useState([]); // Aquí guardamos los datos de los tickets

  // Cargar los datos de localStorage cuando el componente se monta
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('savedData')) || [];  // Si no hay datos, un array vacío
    setSavedData(storedData); // Establecer los datos en el estado
  }, []);

  // Función para cambiar las pestañas
  const renderContent = () => {
    switch (activeTab) {
      case 'Timeline':
        return <Timeline data={savedData} />;  // Solo renderizamos Timeline cuando la pestaña es 'Timeline'
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
