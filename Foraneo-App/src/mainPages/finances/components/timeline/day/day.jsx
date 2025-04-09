import React from "react";
import './day.css';

const Day = ({ date }) => {
  // Convertimos la fecha en un objeto Date
  const formattedDate = new Date(date);

  // Extraemos el día, mes y día de la semana
  const day = formattedDate.getDate();
  const month = formattedDate.toLocaleString('default', { month: 'long' }); // Mes
  const weekday = formattedDate.toLocaleString('default', { weekday: 'short' }); // Día de la semana

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

      {/* Opcionalmente, puedes mostrar los valores de ingresos y gastos del día */}
      {/* <section className="timeLineMiniValues">
        <p className="incomesP">+ $12.000</p>
        <p className="expensesP">-$6.000</p>
      </section> */}
    </section>
  );
};

export default Day;
