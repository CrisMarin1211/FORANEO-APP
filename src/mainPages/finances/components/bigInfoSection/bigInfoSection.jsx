
import React, { useState, useEffect } from "react";
import "./bigInfoSection.css";
import Timeline from "../timeline/timeline";
import Statistics from "../statistics/statistics";
import GoalSection from "../goalSection/goalSection1";
import { useSelector } from "react-redux";

const BigInfoSection = ({ selectedMonth, hasNoData, filteredData }) => {
  const [activeTab, setActiveTab] = useState("Timeline");
  const goal = useSelector((state) => state.finances.goal);

  const NoDataMessage = () => (
    <section
      className="no-data-message"
      style={{
        textAlign: "center",
        padding: "2rem",
        color: "#555",
      }}
    >
      <p>You don't have expenses or incomes for this month yet.</p>
    </section>
  );

  const renderContent = () => {
    if (hasNoData || filteredData.length === 0) {
      return <NoDataMessage />;
    }
    const isGoalVisible =
      goal &&
      new Date(goal.startDate) <= new Date(selectedMonth + "-01") &&
      new Date(goal.endDate) >= new Date(selectedMonth + "-01");
    if (activeTab === "Timeline") {
      return (
        <Timeline
          className="timelinesectionbig"
          data={filteredData}
          selectedMonth={selectedMonth}
        />
      );
    } else if (activeTab === "Statistics") {
      return <Statistics filteredData={filteredData} />;
    } else if (activeTab === "Goal" && isGoalVisible) {
      return <GoalSection />;
    } else {
      return <GoalSection />;
    }
  };

  return (
    <section className="big-info-container">
      <section className="tabs">
        <section
          className={`tab ${
            activeTab === "Timeline" ? "active Timeline-tab" : ""
          }`}
          onClick={() => setActiveTab("Timeline")}
        >
          📃 Timeline
        </section>
        <section
          className={`tab ${
            activeTab === "Statistics" ? "active Statistics-tab" : ""
          }`}
          onClick={() => setActiveTab("Statistics")}
        >
          📊 Statistics
        </section>
        <section
          className={`tab ${activeTab === "Goal" ? "active Goal-tab" : ""}`}
          onClick={() => setActiveTab("Goal")}
        >
          🎯 Goal
        </section>
      </section>

      <section className="tab-content">{renderContent()}</section>
    </section>
  );
};

export default BigInfoSection;
