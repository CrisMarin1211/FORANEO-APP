import React, { useState, useEffect } from 'react';
import './bigInfoSection.css';
import Timeline from '../timeline/timeline';
import Statistics from '../statistics/statistics';

const BigInfoSection = ({ selectedMonth, hasNoData }) => {
  const [activeTab, setActiveTab] = useState('Timeline');
  const [savedData, setSavedData] = useState([]);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('savedData')) || [];
    setSavedData(storedData);
  }, []);


  const filterDataByMonth = (month) => {
    if (!month) return [];

    const [selectedYear, selectedMonthIndex] = month.split('-');

    return savedData.filter(item => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();

      return itemYear === parseInt(selectedYear) && itemMonth === parseInt(selectedMonthIndex) - 1;
    });
  };


  const filteredData = filterDataByMonth(selectedMonth);


  const NoDataMessage = () => (
    <section className="no-data-message" style={{
      textAlign: 'center',
      padding: '2rem',
      color: '#555'
    }}>
      <p>You don't have expenses or incomes for this month yet.</p>
    </section>
  );


  const renderContent = () => {

    if (hasNoData || filteredData.length === 0) {
      return <NoDataMessage />;
    }

    switch (activeTab) {
      case 'Timeline':
        return <Timeline data={filteredData} selectedMonth={selectedMonth} />;
      case 'Statistics':
        return <Statistics filteredData={filteredData} />;
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