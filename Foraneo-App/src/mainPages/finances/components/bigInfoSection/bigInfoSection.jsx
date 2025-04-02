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
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'Timeline' ? 'active Timeline-tab' : ''}`}
          onClick={() => setActiveTab('Timeline')}
        >
          Timeline
        </div>
        <div
          className={`tab ${activeTab === 'Statistics' ? 'active Statistics-tab' : ''}`}
          onClick={() => setActiveTab('Statistics')}
        >
          Statistics
        </div>
        <div
          className={`tab ${activeTab === 'Goal' ? 'active Goal-tab' : ''}`}
          onClick={() => setActiveTab('Goal')}
        >
          Goal
        </div>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>
    </section>
  );
};

export default BigInfoSection;
