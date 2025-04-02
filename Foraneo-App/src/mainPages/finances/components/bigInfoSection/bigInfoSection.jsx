import React, { useState } from 'react';
import './bigInfoSection.css';

const BigInfoSection = () => {
  const [activeTab, setActiveTab] = useState('Timeline');

  const renderContent = () => {
    switch (activeTab) {
      case 'Timeline':
        return <p>Data timeline lorem ipsum.</p>;
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
          Timeline
        </section>
        <section
          className={`tab ${activeTab === 'Statistics' ? 'active Statistics-tab' : ''}`}
          onClick={() => setActiveTab('Statistics')}
        >
          Statistics
        </section>
        <section
          className={`tab ${activeTab === 'Goal' ? 'active Goal-tab' : ''}`}
          onClick={() => setActiveTab('Goal')}
        >
          Goal
        </section>
      </section>

      <section className="tab-content">
        {renderContent()}
      </section>
    </section>
  );
};

export default BigInfoSection;
