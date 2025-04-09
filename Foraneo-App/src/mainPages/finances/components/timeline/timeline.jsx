import React from 'react';
import Day from './day/day';
import Ticket from './ticket/ticket';

const Timeline = ({ data }) => {
  // Función para agrupar los tickets por fecha
  const groupByDate = (data) => {
    return data.reduce((acc, ticket) => {
      const ticketDate = ticket.date;  // Usamos la fecha de cada ticket
      if (!acc[ticketDate]) {
        acc[ticketDate] = [];
      }
      acc[ticketDate].push(ticket);
      return acc;
    }, {});
  };

  // Agrupamos los tickets por fecha
  const groupedTickets = groupByDate(data);

  // Obtenemos las fechas y las ordenamos de la más reciente a la más antigua
  const sortedDates = Object.keys(groupedTickets).sort((a, b) => new Date(b) - new Date(a));

  return (
    <section>
      {/* Mapeamos las fechas ordenadas y sus respectivos tickets */}
      {sortedDates.map((date, index) => {
        // Sumamos un día a la fecha antes de pasarla a Day
        const adjustedDate = new Date(date);
        adjustedDate.setDate(adjustedDate.getDate() + 1); // Sumamos un día

        return (
          <section key={index}>
            <Day date={adjustedDate.toISOString().split('T')[0]} />

            {/* Renderiza los tickets de esa fecha */}
            {groupedTickets[date].map((ticket, ticketIndex) => (
              <Ticket
                key={ticketIndex}
                category={ticket.category}
                value={ticket.value}
                name={ticket.name}
                details={ticket.details}  // Aseguramos que se pase el campo details
                type={ticket.type}
              />
            ))}
          </section>
        );
      })}
    </section>
  );
};

export default Timeline;
