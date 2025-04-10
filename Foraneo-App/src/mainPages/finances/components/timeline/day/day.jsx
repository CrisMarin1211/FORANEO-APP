import React from "react";
import './day.css';

const Day = ({ date }) => {

  const formattedDate = new Date(date);


  const day = formattedDate.getDate();
  const month = formattedDate.toLocaleString('default', { month: 'long' });
  const weekday = formattedDate.toLocaleString('default', { weekday: 'short' });

  return (
    <section className="timeLineDate">
      <h2 className="timeLineMonth">
        {month} {day}
      </h2>
      <section className="timeLineDay">
        <h4 className="dayOfWeek">
          {weekday}
        </h4>
      </section>


    </section>
  );
};

export default Day;
